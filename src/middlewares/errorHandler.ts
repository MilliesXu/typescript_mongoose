import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode).send({
    message: `${err.message}`,
    stack: process.env.NODE_ENV as string === 'development' ? `${err.stack}` : null
  })
}

export default errorHandler
