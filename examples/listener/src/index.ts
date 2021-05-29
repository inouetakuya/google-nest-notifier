import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const index = app.listen(process.env.PORT || 3000, (): void => {
  // @ts-ignore TS2531: Object is possibly 'null'.
  const port = index.address().port
  console.log(`API Server running on http://localhost:${port}`)
})
