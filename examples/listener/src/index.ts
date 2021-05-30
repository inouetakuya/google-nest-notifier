import { app } from './app'

const server = app.listen(process.env.PORT || 3000, (): void => {
  // @ts-ignore TS2531: Object is possibly 'null'.
  const port = server.address().port
  console.log(`API Server running on http://localhost:${port}`)
})
