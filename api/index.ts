import express, { Application } from 'express'
import routes from './routes/'
import { Server } from '~/types'

const app: Application = express()

//  Body Parser
app.use(express.json())

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

export default app
