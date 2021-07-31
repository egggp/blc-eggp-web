import express, { Application } from 'express'
import routes from '~/api/routes'
import { errorHandler } from '~/api/middlewares/error.middleware'
import { Server } from '~/types'

const app: Application = express()

//  Body Parser
app.use(express.json())
app.use(errorHandler)

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

export default app
