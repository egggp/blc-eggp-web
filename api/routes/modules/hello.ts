import { Router } from 'express'
import { failed, success } from '~/api/helpers/response'
import Question from '~/api/models/question'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    // const question = new Question({ itemKey: 'Hello World!', text: 'Hello World!!' })
    const result = await Question.query().exec()
    success(res, result)
  } catch (e) {
    failed(res, e)
  }
})

export default {
  name: 'hello',
  router
}
