import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import path from 'path'

// @ts-ignore TS7016: Could not find a declaration file for module 'morgan'
import morgan from 'morgan'

import ngrokService from '~/lib/ngrokService'
import apiGatewayService from '~/lib/apiGatewayService'
import notificationController from '~/lib/notificationController'

dotenv.config()

const environment = process.env.NODE_ENV || 'development'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// https://github.com/expressjs/morgan#combined をベースにして
// - date format を変更
// - response-time ms を追加
const logFormat =
  ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'

const logStream = fs.createWriteStream(
  path.join(__dirname, `../log/${environment}.log`),
  { flags: 'a' }
)

app.use(morgan(logFormat))
app.use(morgan(logFormat, { stream: logStream }))

app.post('/notifications', notificationController.create)

const server = app.listen(process.env.PORT || 3000, async () => {
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
