import express from 'express'
import { notificationsController } from './controllers/notificationsController'

const app = express()

app.use(express.json())
app.post('/notifications', notificationsController.create)

export { app }
