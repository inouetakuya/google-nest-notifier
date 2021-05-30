import express from 'express'
import { notificationsController } from './controllers/notificationsController'
import { boomHandler } from './lib/boomHandler'
import { errorHandler } from './lib/errorHandler'

const app = express()

app.use(express.json())

app.post('/notifications', notificationsController.create)

app.use(boomHandler)
app.use(errorHandler)

export { app }
