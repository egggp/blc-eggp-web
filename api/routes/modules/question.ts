import { Router } from 'express'
import { failed, success } from '~/api/helpers/response'
import { generateKey } from '~/api/helpers/gen'
import { Model } from '~/types/model.type'
import Question from '~/api/models/question'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const result = await Question.scan().all().exec()
    success(res, result)
  } catch (e) {
    failed(res, e)
  }
})

router.post('/', async (req, res) => {
  const { title, itemA, itemB, tags } = req.body
  const itemKey = generateKey()

  const item: Model.Question = {
    itemKey,
    itemA,
    itemB,
    title,
    tags,
    additionalInfo: {
      commentSize: 0,
      goodRate: 0,
      badRate: 0,
      viewRate: 0
    }
  }

  try {
    const question = new Question(item)
    const result = await question.save()

    success(res, result)
  } catch (e) {
    failed(res, e)
  }
})

export default {
  name: 'question',
  router
}
