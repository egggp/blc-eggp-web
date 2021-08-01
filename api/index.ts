import express, { Application } from 'express'
import routes from '~/api/routes'
import { errorHandler } from '~/api/middlewares/error.middleware'
import { Server } from '~/types/server.type'
import '~/api/helpers/aws'

const app: Application = express()

//  Body Parser
app.use(express.json())

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

//  Error Handler
app.use(errorHandler)

export default app
