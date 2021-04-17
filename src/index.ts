import dotenv from 'dotenv'
import express, { Request } from 'express'
import fs from 'fs'
import path from 'path'

// @ts-ignore TS7016: Could not find a declaration file for module 'morgan'
import morgan from 'morgan'

if (process.env.USE_DIST) require('module-alias/register')

import ngrokService from '~/lib/ngrokService'
import apiGatewayService from '~/lib/apiGatewayService'
import notificationController from '~/lib/notificationController'
import boomHandler from '~/lib/boomHandler'
import errorHandler from '~/lib/errorHandler'

dotenv.config()

const environment = process.env.NODE_ENV || 'development'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

morgan.token('request-body', (request: Request) => {
  return JSON.stringify(request.body)
})

const logFormat =
  '[:date[iso]] :remote-addr :method ":url" request-body: :request-body :status in :response-time[0] ms'

const logStream = fs.createWriteStream(
  path.join(__dirname, `../log/${environment}.log`),
  { flags: 'a' }
)

app.use(morgan(logFormat))
app.use(morgan(logFormat, { stream: logStream }))

app.post('/notifications', notificationController.create)

app.use(boomHandler)
app.use(errorHandler)

// @ts-ignore TS2697: An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your `--lib` option.
const server = app.listen(process.env.PORT || 3000, async () => {
  // @ts-ignore TS2531: Object is possibly 'null'.
  const port = server.address().port

  if (environment === 'production') {
    const ngrokUrl = await ngrokService.connect({
      port,
      authtoken: process.env.NGROK_TOKEN,
      region: process.env.NGROK_REGION
    })
    console.log(
      [`Forwarding: ${ngrokUrl}`, `-> http://localhost:${port}`].join('\n')
    )

    if (process.env.USE_API_GATEWAY) {
      const apiGatewayUrl = apiGatewayService.putIntegration({
        region: process.env.API_GATEWAY_REGION,
        restApiId: process.env.API_GATEWAY_REST_API_ID,
        resourceId: process.env.API_GATEWAY_RESOURCE_ID,
        httpMethod: process.env.API_GATEWAY_HTTP_METHOD,
        url: ngrokUrl,
        path: '/notifications',
        profile: process.env.API_GATEWAY_PROFILE
      })

      console.log(
        [
          `HttpProxy: ${apiGatewayUrl}`,
          `-> ${ngrokUrl}/notifications`,
          `-> http://localhost:${port}/notifications`
        ].join('\n')
      )
    }
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
