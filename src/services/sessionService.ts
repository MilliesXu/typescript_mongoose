import { get } from 'lodash'
import { FilterQuery, UpdateQuery } from 'mongoose'
import Session, { iSessionDocument } from '../models/sessionModel'
import User from '../models/userModel'
import { verify, signIn } from '../utils/jwtUtils'

export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent })

  return session
}

export const getSession = async (query: FilterQuery<iSessionDocument>) => {
  const sessions = await Session.findOne(query).lean()

  return sessions
}

export const updateSession = async (query: FilterQuery<iSessionDocument>, update: UpdateQuery<iSessionDocument>) => {
  return await Session.updateOne(query, update)
}

export const reissueAccessToken = async ({ refreshToken } : { refreshToken: string }) => {
  const { decoded } = await verify(refreshToken, 'refreshToken')

  if (!decoded || !get(decoded, 'session')) return false

  const session = await Session.findById(get(decoded, 'session'))

  if (!session || !session.valid) return false

  const user = await User.findById({ _id: session.user })

  if (!user) return false

  const accessToken = await signIn({
    userId: user._id, session: session._id
  }, { expiresIn: process.env.ACCESS_TOKEN_TTL as string })

  return accessToken
}
