import { Request, Response, NextFunction } from 'express'
import { badData, notFound } from '@hapi/boom'
import { getMulticastDnsDataByDeviceName } from '~/lib/multicastDnsService'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleNestClient from '~/lib/GoogleNestClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const deviceName = request.body.deviceName
      if (!deviceName) {
        throw badData('deviceName is required', { requestBody: request.body })
      }

      const text = request.body.text
      if (!text) {
        throw badData('text is required', { requestBody: request.body })
      }

      const multicastDnsData = await getMulticastDnsDataByDeviceName(deviceName)
      if (!multicastDnsData) {
        throw notFound('Google Nest Device is not found', { deviceName })
      }

      const speechUrl: string = await textToSpeechUrl({
        text,
        language: 'ja',
        speed: 1,
      })

      const googleNestClient = new GoogleNestClient(multicastDnsData.ipAddress)
      const status = await googleNestClient.notify({ speechUrl })

      response.status(201).json({ status })
    })().catch(next)
  },
}

export default notificationController
