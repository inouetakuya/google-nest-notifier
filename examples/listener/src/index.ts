import { app } from './app'
import { ngrokService } from './lib/ngrokService'

const environment = process.env.NODE_ENV || 'development'

const server = app.listen(process.env.PORT || 3000, async () => {
  // @ts-ignore TS2531: Object is possibly 'null'.
  const port = server.address().port

  if (environment === 'production') {
    if (process.env.USE_NGROK === '1') {
      const ngrokUrl = await ngrokService.connect({
        port,
        authtoken: process.env.NGROK_TOKEN,
        region: process.env.NGROK_REGION,
      })
      console.log(
        [`Forwarding: ${ngrokUrl}`, `-> http://localhost:${port}`].join('\n')
      )
    } else {
      console.log(`API Server running on http://localhost:${port}`)
    }
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
