const fastify = require('fastify')
const mongo = require('mongodb')
const nanoid = require('nanoid/async')

const loggerLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
const server = fastify({ ignoreTrailingSlash: true, logger: { level: loggerLevel } })

const { getCollection } = require('./database')

server.get('/', async (req, res) => {
  try {
    const userCollection = await getCollection('users')
    let result = await userCollection.find({}).toArray()
    res.status(200).send(result)
  } catch (err) {
    server.log.error(err.message)
    res.status(500).send()
  }
})

server.post('/', async (req, res) => {
  const { username, name, avatar, email, birthday, linkedAccounts } = req.body
  try {
    const userCollection = await getCollection('users')
    const now = new Date()
    const { insertedId } = await userCollection.insertOne({
      username,
      name,
      avatar,
      email,
      birthday,
      linkedAccounts: {
        ...linkedAccounts,
        messenger: 'AUTH_' + (await nanoid(16))
      },
      privilege: 'normal',
      createdAt: now,
      updatedAt: now
    })
    res.status(200).send({ _id: insertedId })
  } catch (err) {
    server.log.error(err.message)
    res.status(500).send()
  }
})

server.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const userCollection = await getCollection('users')
    let result = await userCollection.findOne({ _id: new mongo.ObjectID(id) })
    res.status(200).send(result)
  } catch (err) {
    server.log.error(err.message)
    res.status(500).send()
  }
})

server.get('/linkedAccounts/:service/:id', async (req, res) => {
  const { service, id } = req.params
  try {
    const userCollection = await getCollection('users')
    const user = await userCollection.findOne({
      ['linkedAccounts.' + service]: id
    })
    res.status(200).send(user)
  } catch (err) {
    server.log.error(err.message)
    res.status(500).send()
  }
})

server.put('/linkedAccounts/:service/:id/:newID', async (req, res) => {
  const { service, id, newID } = req.params
  try {
    const userCollection = await getCollection('users')
    await userCollection.updateOne(
      {
        ['linkedAccounts.' + service]: id
      },
      {
        $set: {
          ['linkedAccounts.' + service]: newID
        },
        $currentDate: { updatedAt: true }
      }
    )
    res.status(204)
  } catch (err) {
    server.log.error(err.message)
    res.status(500).send()
  }
})

/**
 * Get an user with service id
 */
server.get('/users/linkedAccounts/:service/:id', async (req, res) => {
  const { service, id } = req.params
  const query = {
    ["linkedAccounts." + service] : id
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
