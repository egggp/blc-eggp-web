import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { success } from '~/api/helpers/response'
import { Model } from '~/types/model.type'
import { AlreadyUsingUserIdError, NoUserIdError } from '~/api/errors/auth.error'
import wrapAsync from '~/api/middlewares/async.middleware'
import User from '~/api/models/user'
import ParamsError from '~/api/errors/params.error'
import { generatePassword } from '~/api/helpers/password'
import { projection, reverseProjection } from '~/api/helpers/object'

const router = Router()

const JWT_KEY = process.env.JWT_KEY || ''

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
      const token = jwt.sign(
        projection(user, ['userId', 'auth']),
        JWT_KEY
      )
      return success(res, { token })
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
      rules: ['USER'],
      auth: 'USER',
      password: hashedPassword,
      completed: false
    }

    const user = new User(item)
    const result = await user.save()

    success(res, reverseProjection(result, ['password']))
  }
))

export default {
  name: 'auth',
  router
}
