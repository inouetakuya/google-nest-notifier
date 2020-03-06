import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import NgrokClient from '~/lib/NgrokClient'
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
    const ngrokClient = new NgrokClient(port)
    const ngrokUrl = await ngrokClient.connect()
    console.log(`Forwarding: ${ngrokUrl} -> localhost:${port}`)
  } else {
    console.log(`API Server running on http://localhost:${port}`)
  }
})
