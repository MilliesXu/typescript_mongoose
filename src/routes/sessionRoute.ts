import express from 'express'

import validate from '../middlewares/validateRequest'
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from '../controllers/sessionController'
import { createSessionSchema } from '../schemas/sessionSchema'
import deserializeUser from '../middlewares/deserializeUser'

const sessionRoute = express.Router()

sessionRoute.post('/', validate(createSessionSchema), createSessionHandler)
sessionRoute.get('/', deserializeUser, getSessionHandler)
sessionRoute.delete('/', deserializeUser, deleteSessionHandler)

export default sessionRoute
