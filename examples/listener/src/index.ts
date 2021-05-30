import { app } from './app'
import { apiGatewayService } from './lib/apiGatewayService'
import { ngrokService } from './lib/ngrokService'

const environment = process.env.NODE_ENV || 'development'

const server = app.listen(process.env.PORT || 3000, async () => {
  // @ts-ignore TS2531: Object is possibly 'null'.
  const port = server.address().port

  if (environment === 'production') {
    console.log(process.env.USE_NGROK)

    if (process.env.USE_NGROK === '1') {
      const ngrokUrl = await ngrokService.connect({
        port,
        authtoken: process.env.NGROK_TOKEN,
        region: process.env.NGROK_REGION,
      })
      console.log(
        [`Forwarding: ${ngrokUrl}`, `-> http://localhost:${port}`].join('\n')
      )

      if (process.env.USE_API_GATEWAY === '1') {
        const apiGatewayUrl = apiGatewayService.putIntegration({
          region: process.env.API_GATEWAY_REGION,
          restApiId: process.env.API_GATEWAY_REST_API_ID,
          resourceId: process.env.API_GATEWAY_RESOURCE_ID,
          httpMethod: process.env.API_GATEWAY_HTTP_METHOD,
          url: ngrokUrl,
          path: '/notifications',
          profile: process.env.API_GATEWAY_PROFILE,
        })

        console.log(
          [
            `HttpProxy: ${apiGatewayUrl}`,
            `-> ${ngrokUrl}/notifications`,
            `-> http://localhost:${port}/notifications`,
          ].join('\n')
        )
      }
    } else {
      console.log(`API Server running on http://localhost:${port}`)
    }
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
