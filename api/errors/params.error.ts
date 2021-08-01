import { Result, ValidationError } from 'express-validator'
import HttpError from '~/api/errors/http.error'

export default class ParamsError extends HttpError {
  constructor (validationError: Result<ValidationError>) {
    const parameters = validationError.array().map(error => error.param).join(', ')
    const message = `parameter [${parameters}] must be required.`
    super(400, message)
  }
}
