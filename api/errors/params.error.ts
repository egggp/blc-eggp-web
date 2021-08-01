import { Result, ValidationError } from 'express-validator'
import HttpException from '~/api/commons/httpException'

export default class ParamsError extends HttpException {
  constructor (validationError: Result<ValidationError>) {
    const parameters = validationError.array().map(error => error.param).join(', ')
    const message = `parameter [${parameters}] must be required.`
    super(400, message)
  }
}
