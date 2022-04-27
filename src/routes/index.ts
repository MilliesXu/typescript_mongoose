import { Express, Request, Response } from 'express'
import userRoute from './userRoute'
import sessionRoute from './sessionRoute'
import productRoute from './productRoute'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.status(200))

  app.use('/api/user', userRoute)
  app.use('/api/session', sessionRoute)
  app.use('/api/product', productRoute)
}
