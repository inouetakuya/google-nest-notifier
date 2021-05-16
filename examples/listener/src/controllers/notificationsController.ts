import { badData, notFound } from '@hapi/boom'
import { Request, Response, NextFunction } from 'express'
import { GoogleNestNotifier } from '../../../../packages/google-nest-notifier/src'

export const notificationsController = {
  create: (request: Request, response: Response, next: NextFunction) => {
    ;(async () => {
      const { deviceName, ipAddress, text, language } = request.body

      if (!deviceName && !ipAddress) {
        throw badData('Either deviceName or ipAddress is required', {
          requestBody: request.body,
        })
      }

      if (!text) {
        throw badData('Text is required', {
          requestBody: request.body,
        })
      }

      const googleNestNotifier = new GoogleNestNotifier()

      const _ipAddress =
        ipAddress || (await googleNestNotifier.getIpAddress(deviceName))

      if (!_ipAddress)
        throw notFound('Google Nest device is not found', {
          requestBody: request.body,
        })

      const status = await googleNestNotifier.notify(text, {
        ipAddress: _ipAddress,
        language,
      })

      response.status(201).json({ status })
    })().catch(next)
  },
}
