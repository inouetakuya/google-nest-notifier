import { Request, Response, NextFunction } from 'express'
import { GoogleNestNotifier } from '../../../../packages/google-nest-notifier/src'

export const notificationsController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const { deviceName, ipAddress, text, language } = request.body
      const googleNestNotifier = new GoogleNestNotifier()
      const status = await googleNestNotifier.notify(text, {
        deviceName,
        ipAddress,
        language,
      })

      response.status(201).json({ status })
    })().catch(next)
  },
}
