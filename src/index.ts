import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import * as ngrok from 'ngrok'

dotenv.config()

const app = express()

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

const server = app.listen(process.env.PORT || 3000, async () => {
  const port = server.address().port

  if (process.env.NODE_ENV === 'production') {
    const ngrokOptions = { port }

    if (process.env.NGROK_TOKEN === 'PLEASE_SET_YOUR_NGROK_TOKEN') {
      console.warn(
        "Please sign up ngrok and set your token to .env so that your tunnels don't time out"
      )
    } else if (process.env.NGROK_TOKEN) {
      Object.assign(ngrokOptions, { authtoken: process.env.NGROK_TOKEN })
    }

    const ngrokUrl = await ngrok.connect(ngrokOptions)
    console.log(`Forwarding: ${ngrokUrl} -> localhost:${port}`)
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
