import express from 'express'
import { notificationsController } from './controllers/notificationsController'
import { boomHandler } from './lib/boomHandler'

const app = express()

app.use(express.json())

app.post('/notifications', notificationsController.create)

app.use(boomHandler)

export { app }
