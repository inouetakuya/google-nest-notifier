import { Request, Response, NextFunction } from 'express'
import { Boom } from '@hapi/boom'

const boomHandler = (
  error: Boom,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!error.isBoom) return next(error)

  response.status(error.output.statusCode).json({
    error: error.output.payload.error,
    message: error.output.payload.message
  })
}

export default boomHandler
