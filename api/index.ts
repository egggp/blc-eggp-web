import express, { Application } from 'express'
import passport from 'passport'
import morgan from 'morgan'
import session from 'express-session'

import routes from '~/api/routes'
import { errorHandler } from '~/api/middlewares/error.middleware'
import { Server } from '~/types/server.type'

//  Plugins
import '~/api/plugins/passport.plugin'
import '~/api/plugins/aws.plugin'

const SESSION_KEY = process.env.SESSION_KEY

const app: Application = express()

if (!SESSION_KEY) {
  console.error('No session secret string. Set SESSION_KEY environment variable.')
  process.exit(1)
}

//  Add Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(session({
  secret: SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))

//  Passport
app.use(passport.initialize())
app.use(passport.session())

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

//  Error Handler
app.use(errorHandler)

export default app
