import { Request, Response, NextFunction } from 'express'
import { getMulticastDnsDataByDeviceName } from '~/lib/multicastDnsService'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleNestClient from '~/lib/GoogleNestClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const text = request.body.text
      if (!text) throw new Error('text is required')

      const deviceName = process.env.GOOGLE_NEST_DEVICE_NAME || ''
      const multicastDnsData = await getMulticastDnsDataByDeviceName(deviceName)

      if (!multicastDnsData?.ipAddress) {
        throw new Error('Google Nest Device is not found')
      }

      const speechUrl: string = await textToSpeechUrl({
        text,
        language: 'ja',
        speed: 1
      })
      const googleNestClient = new GoogleNestClient(multicastDnsData.ipAddress)
      const status = await googleNestClient.notify({ speechUrl })

      response.status(201).json({ status })
    })().catch(next)
  }
}

export default notificationController
