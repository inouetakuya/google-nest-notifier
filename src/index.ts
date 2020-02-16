import { Request, Response } from 'express'

const express = require('express') // eslint-disable-line @typescript-eslint/no-var-requires
const ngrok = require('ngrok') // eslint-disable-line @typescript-eslint/no-var-requires

const app = express()

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

const server = app.listen(3000, async () => {
  const port = server.address().port
  const ngrokUrl = await ngrok.connect({ port: port })
  console.log(`Forwarding: ${ngrokUrl} -> localhost:${port}`)
})
