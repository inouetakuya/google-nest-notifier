import { Request, Response, NextFunction } from 'express'
import { queryMulticastDnsDataByDeviceNames } from '~/lib/multicastDnsService'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleNestClient from '~/lib/GoogleNestClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const deviceNames = request.body.deviceNames
      if (!Array.isArray(deviceNames) || deviceNames.length === 0) {
        throw new Error('deviceNames is required')
      }

      const text = request.body.text
      if (!text) throw new Error('text is required')

      const multicastDnsDataArray = await queryMulticastDnsDataByDeviceNames(
        deviceNames
      )

      if (multicastDnsDataArray.length === 0) {
        // throw new Error('Google Nest Device is not found')
        throw new Error(deviceNames[0])
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
