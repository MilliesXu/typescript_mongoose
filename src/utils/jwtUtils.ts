import jwt, { Algorithm } from 'jsonwebtoken'

const publicKey = process.env.PUBLIC_KEY as string
const privateKey = process.env.PRIVATE_KEY as string

export const signIn = async (object: Object, option?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(option && option),
    algorithm: 'RS256'
  })
}

export const verify = async (token: string, key: string) => {
  try {
    const publicToken = key === 'accessToken' ? privateKey : publicKey
    const algorithm = ['RS256'] as Algorithm[]
    const decoded = jwt.verify(token, publicToken, { algorithms: algorithm })
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: true,
      decoded: null
    }
  }
}
