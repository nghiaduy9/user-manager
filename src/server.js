const fastify = require('fastify')
const rootRouter = require('./router')
const mongolLoader = require('./loaders/mongol')

const loggerLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
const server = fastify({ ignoreTrailingSlash: true, logger: { level: loggerLevel } })

const main = async () => {
  try {
    const mongol = await mongolLoader()
    server.register(rootRouter, {mongol})
    await server.listen(process.env.PORT, '::') // listen to all IPv6 and IPv4 addresses
  } catch (err) {
    server.log.error(err.message)
    process.exit(1)
  }
}

main()
