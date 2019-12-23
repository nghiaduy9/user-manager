const fastify = require('fastify')
const mongo = require('mongodb')

const loggerLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
const server = fastify({ ignoreTrailingSlash: true, logger: { level: loggerLevel } })

const { getCollection } = require('./database')

server.get('/', async (req, res) => {
  try {
    const Users = await getCollection('users')
    let result = await Users.find({}).toArray()
    res.code(200).send(result)
  } catch (err) {
    res.code(500)
  }
})

server.post('/', async (req, res) => {
  const { username, name, email, birthday, linkedAccounts } = req.body
  try {
    const Users = await getCollection('users')
    const { insertedId } = await Users.insertOne({
      username,
      name,
      email,
      birthday,
      linkedAccounts,
      privilege: 'normal',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.code(200).send({ _id: insertedId })
  } catch (err) {
    res.code(500)
  }
})

server.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const Users = await getCollection('users')
    let result = await Users.findOne({ _id: new mongo.ObjectID(id) })
    res.code(200).send(result)
  } catch (err) {
    res.code(500)
  }
})

server.get('/linkedAccounts/:service/:id', async (req, res) => {
  const { service, id } = req.params
  const query = {
    ['linkedAccounts.' + service]: id
  }
  try {
    const userCollection = await getCollection('users')
    const user = await userCollection.findOne(query)
    res.code(200).send(user)
  } catch (err) {
    res.code(500)
  }
})

const start = async () => {
  try {
    server.listen(process.env.PORT, '::') // listen to all IPv6 and IPv4 addresses
  } catch (err) {
    server.log.error(err.message)
    process.exit(1)
  }
}

start()
