import { Request, Response, NextFunction } from 'express'
import HttpException from '~/api/commons/httpException'
import { API } from '~/types'

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500
  const json: API.Response = {
    status,
    message: error.message,
    success: false,
    result: null
  }
  response.status(status).json(json)
}
