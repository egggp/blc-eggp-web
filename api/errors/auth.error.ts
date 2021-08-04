import HttpError from '~/api/errors/http.error'

export class AlreadyUsingUserIdError extends HttpError {
  constructor (userId: string) {
    super(400, `user id [${userId}] is already using.`)
  }
}

export class NoUserIdError extends HttpError {
  constructor (userId: string) {
    super(400, `user id [${userId}] is not registered.`)
  }
}
