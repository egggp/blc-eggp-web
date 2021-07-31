import { Router } from 'express'
import { failed, success } from '~/api/helpers/response'
import Category from '~/api/models/category'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const result = await Category.scan().all().exec()
    success(res, result)
  } catch (e) {
    failed(res, e)
  }
})

router.post('/', async (req, res) => {
  const { value } = req.body
  try {
    const category = new Category({
      value
    })

    const result = await category.save()
    success(res, result)
  } catch (e) {
    failed(res, e)
  }
})

export default {
  name: 'category',
  router
}
