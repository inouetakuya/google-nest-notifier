import { Request, Response } from 'express'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
): void => {
  response.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
    data: {},
  })
}
