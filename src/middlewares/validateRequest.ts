import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    next()
  } catch (err: any) {
    let message = 'Validation Error,'
    message += err.errors.map((error: ZodError) => error.message)
    res.statusCode = 400
    next(new Error(`${message}`))
  }
}

export default validate
