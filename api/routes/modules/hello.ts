import { Router } from 'express'
import { createTable } from '~/api/db/modules/hello'
import { failed, success } from '~/api/helpers/response'

const router = Router()

router.get('/', async (_, res) => {
  try {
    const asd = await createTable()
    success(res, { message: asd })
  } catch (e) {
    failed(res, e)
  }
})

export default {
  name: 'hello',
  router
}
