import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export function isAuthenticated (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

export function authenticateWithJWT (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: true }, (error, user) => {
    if (error) {
      next(error)
    }

    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
}
