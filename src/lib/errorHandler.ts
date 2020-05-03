import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
    data: {}
  })
}

export default errorHandler
