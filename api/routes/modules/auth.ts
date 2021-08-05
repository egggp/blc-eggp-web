import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'

import { failed, success } from '~/api/helpers/response'
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
      throw new NoUserIdError()
    }

    success(res, userInfo)
  })
)

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return next(new NoUserIdError())
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }
      return success(res, user)
    })
  })(req, res, next)
})

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
