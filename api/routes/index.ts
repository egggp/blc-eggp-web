import hello from '~/api/routes/modules/hello'
import category from '~/api/routes/modules/category'

import { Server } from '~/types/server.type'

const routes: Server.IRoute[] = [
  hello,
  category
]

export default routes
