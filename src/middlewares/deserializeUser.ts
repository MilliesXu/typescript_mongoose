import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import { reissueAccessToken } from '../services/sessionService'

import { verify } from '../utils/jwtUtils'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
  const refreshToken = get(req, 'headers.x-refresh')

  if (!accessToken) {
    res.status(401)
    return next(new Error('Unauthorized'))
  }

  const { decoded, expired } = await verify(accessToken, 'accessToken')

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reissueAccessToken({ refreshToken })

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)

      const result = await verify(newAccessToken, 'accessToken')

      res.locals.user = result.decoded
      return next()
    }
  } else {
    res.status(401)
    return next(new Error('Unauthorized'))
  }
}

export default deserializeUser
