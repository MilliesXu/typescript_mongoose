import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { createSession, getSession, updateSession } from '../services/sessionService'
import { validatePassword } from '../services/userService'
import { signIn } from '../utils/jwtUtils'

export const createSessionHandler = asyncHandler(async (req: Request, res: Response) => {
  // Validate user password
  const user = await validatePassword(req.body)

  if (!user) {
    res.status(401)
    throw new Error('Invalid email and password')
  }

  // Check if have session or not
  let session = await getSession({ user: user._id, valid: true })

  if (!session) {
    // Create session
    session = await createSession(user._id, req.get('userAgent') || '')
  }

  // Create an access token
  const accessToken = await signIn({
    userId: user._id, session: session._id
  }, { expiresIn: process.env.ACCESS_TOKEN_TTL as string })

  // Create a refresh token
  const refreshToken = await signIn({
    userId: user._id, session: session._id
  }, { expiresIn: process.env.REFRESH_TOKEN_TTL as string })
  // return access and refresh token

  res.status(200).send({
    accessToken, refreshToken
  })
})

export const getSessionHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = res.locals.user.userId

  const session = await getSession({ user: userId, valid: true })

  if (!session) {
    res.status(404)
    throw new Error('Session not found')
  }

  res.status(200).send(session)
})

export const deleteSessionHandler = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session

  await updateSession({ _id: sessionId }, { valid: false })

  res.status(200).send({
    accessToken: null,
    refreshToken: null
  })
})
