import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import ngrokService from '~/lib/ngrokService'
import apiGatewayService from '~/lib/apiGatewayService'
import notificationController from '~/lib/notificationController'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((request: Request, response: Response, next: NextFunction) => {
  console.log(
    `Received request: ${request.method} ${request.url} from ${request.headers['user-agent']}`
  )
  next()
})

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.post('/notifications', notificationController.create)

const server = app.listen(process.env.PORT || 3000, async () => {
  const port = server.address().port

  if (process.env.NODE_ENV === 'production') {
    const ngrokUrl = await ngrokService.connect({
      port,
      authtoken: process.env.NGROK_TOKEN,
      region: process.env.NGROK_REGION
    })
    console.log(`Forwarding: ${ngrokUrl} -> localhost:${port}`)

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
        `HttpProxy: ${apiGatewayUrl} -> ${ngrokUrl} -> localhost:${port}`
      )
    }
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
