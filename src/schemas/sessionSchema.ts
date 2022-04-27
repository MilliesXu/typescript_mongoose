import { object, string, TypeOf } from 'zod'

export const createSessionSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required'
    }),
    email: string({
      required_error: 'Email is required'
    })
  })
})

// To be use in the request generic type
export type CreateSession = TypeOf<typeof createSessionSchema>
