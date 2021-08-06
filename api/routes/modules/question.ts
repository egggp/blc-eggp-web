import { Router } from 'express'
import { body, param, validationResult } from 'express-validator'
import { generateKey } from '~/api/helpers/gen'
import { success } from '~/api/helpers/response'
import { Model } from '~/types/model.type'
import Question from '~/api/models/question'
import wrapAsync from '~/api/middlewares/async.middleware'
import ParamsError from '~/api/errors/params.error'
import EmptyError from '~/api/errors/empty.error'
import { isAuthenticated } from '~/api/middlewares/auth.middleware'

const router = Router()

router.get('/', wrapAsync(
  async (_, res) => {
    const result = await Question.scan().all().exec()
    success(res, result)
  })
)

router.get('/:itemKey',
  [param('itemKey').exists()],
  wrapAsync(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

    const { itemKey } = req.params

    const result = await Question.get(itemKey)
    if (!result) {
      throw new EmptyError(itemKey)
    }

    success(res, result)
  })
)

router.post('/', [
  body('title').exists(),
  body('itemA').exists(),
  body('itemB').exists(),
  body('tags').exists(),
  isAuthenticated
], wrapAsync(
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

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

    const question = new Question(item)
    const result = await question.save()

    success(res, result)
  })
)

export default {
  name: 'question',
  router
}
