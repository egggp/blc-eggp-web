import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  res.json({
    error: null,
    message: 'success',
    result: {
      hello: 'world'
    }
  })
})

export default {
  name: 'trashes',
  router
}
