import { Request, Response, NextFunction } from 'express'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const ipAddress = request.params.ipAddress
      if (!ipAddress) throw new Error('ipAddress is required')

      const text = request.params.text
      if (!text) throw new Error('text is required')

      const speechUrl: string = await textToSpeechUrl({
        text,
        language: 'ja',
        speed: 1
      })
      const googleHomeClient = new GoogleHomeClient(ipAddress)
      const status = await googleHomeClient.notify({ speechUrl })

      response.status(201).json({ status })
    })().catch(next)
  }
}

export default notificationController
