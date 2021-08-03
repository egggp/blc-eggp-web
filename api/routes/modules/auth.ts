import { Router } from 'express'
import wrapAsync from '~/api/middlewares/async.middleware'
import { success } from '~/api/helpers/response'

const router = Router()

router.get('/', wrapAsync(
  async (_, res) => {
    await success(res, {
      hello: 'World'
    })
  })
)

export default {
  name: 'auth',
  router
}
