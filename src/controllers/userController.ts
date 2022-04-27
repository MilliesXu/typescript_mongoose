import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { omit } from 'lodash'
import { CreateUserInput } from '../schemas/userSchema'

import { createUser } from '../services/userService'

export const createUserHandler = asyncHandler(async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body)

    res.status(201).send(omit(user.toJSON(), 'password'))

    return
  } catch (error: any) {
    res.status(403)
    throw new Error('Email has been used')
  }
})
