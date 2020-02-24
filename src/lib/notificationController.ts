import { Request, Response } from 'express'

const notificationController = {
  create: (request: Request, response: Response) => {
    const text = request.params.text
    if (!text) throw new Error('text is required')
    response.status(201).json({ text })
  }
}

export default notificationController
