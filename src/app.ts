import 'dotenv/config'

import express from 'express'

import connect from './config/connect'
import middlewares from './middlewares'
import routes from './routes'
import log from './utils/logger'

const PORT = parseInt(process.env.PORT as string) || 5000
const HOST = process.env.HOST as string

const app = express()

app.use(express.json())

app.listen(PORT, HOST, () => {
  log.info(`Port is running on ${HOST}:${PORT}`)

  connect()
  routes(app)
  middlewares(app)
})
