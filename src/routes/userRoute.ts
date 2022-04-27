import express from 'express'

import { createUserHandler } from '../controllers/userController'
import validate from '../middlewares/validateRequest'
import { createUserSchema } from '../schemas/userSchema'

const userRoute = express.Router()

userRoute.post('/', validate(createUserSchema), createUserHandler)

export default userRoute
