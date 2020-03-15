import { Request, Response, NextFunction } from 'express'
import textToSpeechUrl from '~/lib/textToSpeechUrl'
import GoogleNestClient from '~/lib/GoogleNestClient'

const notificationController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const ipAddress = process.env.GOOGLE_NEST_IP_ADDRESS
      if (!ipAddress) throw new Error('ipAddress is required')

      const text = request.body.text
      if (!text) throw new Error('text is required')

      const speechUrl: string = await textToSpeechUrl({
        text,
        language: 'ja',
        speed: 1
      })
      const googleNestClient = new GoogleNestClient(ipAddress)
      const status = await googleNestClient.notify({ speechUrl })

      response.status(201).json({ status })
    })().catch(next)
  }
}

export default notificationController
