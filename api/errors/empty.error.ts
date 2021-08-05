import HttpError from '~/api/errors/http.error'

export default class EmptyError extends HttpError {
  constructor (key: string) {
    const message = `[${key}] 에 해당되는 아이템은 존제하지 않습니다.`
    super(404, message)
  }
}
