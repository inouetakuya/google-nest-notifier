import dotenv from 'dotenv'
import express, { Request } from 'express'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import { notificationsController } from './controllers/notificationsController'
import { boomHandler } from './lib/boomHandler'
import { errorHandler } from './lib/errorHandler'

const environment = process.env.NODE_ENV || 'development'
if (environment !== 'test') dotenv.config()

const app = express()

app.use(express.json())

morgan.token('request-body', (request: Request) => {
  return JSON.stringify(request.body)
})

const logFormat =
  '[:date[iso]] :remote-addr :method ":url" request-body: :request-body :status in :response-time[0] ms'

const logStream = fs.createWriteStream(
  path.join(__dirname, `../logs/${environment}.log`),
  { flags: 'a' }
)

app.use(morgan(logFormat))
app.use(morgan(logFormat, { stream: logStream }))

app.post('/notifications', notificationsController.create)

app.use(boomHandler)
app.use(errorHandler)

export { app }
