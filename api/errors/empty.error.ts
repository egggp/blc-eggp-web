import HttpError from '~/api/errors/http.error'

export default class EmptyError extends HttpError {
  constructor (key: string) {
    const message = `there is no key [${key}] item.`
    super(404, message)
  }
}
