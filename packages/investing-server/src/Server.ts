import fastify from 'fastify'
import apiRoute from './routes/api/assets'
import searchPlugin from './search/plugin'
import compress from 'fastify-compress'
const PORT = parseInt(process.env.PORT!, 10)

interface IQuerystring {
  username: string
  password: string
}

interface IHeaders {
  'H-Custom': string
}

export default class Server {
  app = fastify({ logger: true })

  constructor() {
    this.setup()
  }

  setup() {
    this.app.register(compress)
    this.app.register(searchPlugin)
    this.app.register(apiRoute, { prefix: '/api' })
  }

  start() {
    try {
      this.app.listen(PORT)
    } catch (e) {
      this.app.log.error(e)
    }
  }
}
