import { Request, Response } from 'express'

const notificationController = {
  create: (request: Request, response: Response) => {
    const text = request.params.text
    response.status(201).json({ text })
  }
}

export default notificationController
