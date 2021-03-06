import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { success } from '~/api/helpers/response'
import { Model } from '~/types/model.type'
import { AlreadyUsingUserIdError, NoUserError } from '~/api/errors/auth.error'
import wrapAsync from '~/api/middlewares/async.middleware'
import User from '~/api/models/user'
import ParamsError from '~/api/errors/params.error'
import { generatePassword } from '~/api/helpers/password'
import { projection, reverseProjection } from '~/api/helpers/object'
import { authenticateWithJWT } from '~/api/middlewares/auth.middleware'

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET || ''

router.get('/check/:userId', wrapAsync(
  async (req, res) => {
    const { userId } = req.params

    const userInfo = await User.get(userId, {
      attributes: ['userId', 'completed']
    })

    if (!userInfo) {
      throw new NoUserError()
    }

    success(res, userInfo)
  })
)

router.get('/user', [authenticateWithJWT], wrapAsync(
  async (req, res) => {
    const user = req.user
    if (!user) {
      throw new NoUserError()
    }
    await success(res, reverseProjection(user, ['password']))
  }
))

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return next(new NoUserError())
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }
      const token = jwt.sign(
        projection(user, ['userId', 'auth']),
        JWT_SECRET
      )
      return success(res, token)
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
