import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import * as ngrok from 'ngrok'

dotenv.config()

const app = express()

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

const server = app.listen(process.env.PORT || 3000, async () => {
  const port = server.address().port
  const ngrokUrl = await ngrok.connect({ port: port })
  console.log(`Forwarding: ${ngrokUrl} -> localhost:${port}`)
})
