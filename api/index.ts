import express, { Application } from 'express'
import passport from 'passport'
import routes from '~/api/routes'
import { errorHandler } from '~/api/middlewares/error.middleware'
import { Server } from '~/types/server.type'

//  Plugins
import '~/api/plugins/passport'
import '~/api/plugins/aws.plugin'

const app: Application = express()

//  Body Parser
app.use(express.json())

//  Passport
app.use(passport.initialize())
app.use(passport.session())

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

//  Error Handler
app.use(errorHandler)

export default app
