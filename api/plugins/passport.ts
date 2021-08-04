import passport from 'passport'
import LocalStrategy from '~/api/strategies/passport/local.passport'
import { Model } from '~/types/model.type'

passport.use(LocalStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser<Model.User>((user, done) => done(null, user))
