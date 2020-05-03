import { Request, Response, NextFunction } from 'express'
import { badData, notFound } from '@hapi/boom'
import { queryMulticastDnsDataByDeviceNames } from '~/lib/multicastDnsService'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleNestClient from '~/lib/GoogleNestClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const deviceNames = request.body.deviceNames
      if (!Array.isArray(deviceNames) || deviceNames.length === 0) {
        throw badData('deviceNames is required')
      }

      const text = request.body.text
      if (!text) throw badData('text is required')

      const multicastDnsDataArray = await queryMulticastDnsDataByDeviceNames(
        deviceNames
      )

      if (multicastDnsDataArray.length === 0) {
        throw notFound(`deviceName: ${deviceNames[0]} is not found`)
      }

      const speechUrl: string = await textToSpeechUrl({
        text,
        language: 'ja',
        speed: 1
      })

      const statuses = await Promise.all(
        multicastDnsDataArray.map(multicastDnsData => {
          const googleNestClient = new GoogleNestClient(
            multicastDnsData.ipAddress
          )
          return googleNestClient.notify({ speechUrl })
        })
      )

      response.status(201).json({ statuses })
    })().catch(next)
  }
}

export default notificationController
