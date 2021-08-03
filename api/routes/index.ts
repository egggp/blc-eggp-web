import question from '~/api/routes/modules/question'
import auth from '~/api/routes/modules/auth'

import { Server } from '~/types/server.type'

const routes: Server.IRoute[] = [
  question,
  auth
]

export default routes
