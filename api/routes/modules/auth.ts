import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'

import { success } from '~/api/helpers/response'
import { Model } from '~/types/model.type'
import { AlreadyUsingUserIdError, NoUserIdError } from '~/api/errors/auth.error'
import wrapAsync from '~/api/middlewares/async.middleware'
import User from '~/api/models/user'
import ParamsError from '~/api/errors/params.error'
import { generatePassword } from '~/api/helpers/password'

const router = Router()

router.get('/check/:userId', wrapAsync(
  async (req, res) => {
    const { userId } = req.params

    const userInfo = await User.get(userId, {
      attributes: ['userId', 'completed']
    })

    if (!userInfo) {
      throw new NoUserIdError(userId)
    }

    success(res, userInfo)
  })
)

router.post('/login',
  passport.authenticate('local'),
  wrapAsync(
    async (req, res) => {
      if (!req.user) {
        throw new Error('failed login')
      }
      await success(res, req.user)
    }
  )
)

router.post('/signup', [
  body('userId').exists(),
  body('password').exists(),
  body('userName').exists()
], wrapAsync(
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

    const { userId, password, userName } = req.body
    const hashedPassword = generatePassword(password)

    const useInfo = await User.get(userId)

    if (useInfo) {
      throw new AlreadyUsingUserIdError(userId)
    }

    const item: Model.User = {
      userId,
      userName,
      password: hashedPassword,
      completed: false
    }

    const user = new User(item)
    const result = await user.save()

    success(res, result)
  }
))

export default {
  name: 'auth',
  router
}
