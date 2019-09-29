require('dotenv-flow').config()

const fastify = require('fastify')
const mongo = require('mongodb')

const loggerLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
const server = fastify({ ignoreTrailingSlash: true, logger: { level: loggerLevel } })

const { getCollection } = require('./database')

/**
 * Get all users
 */
server.get('/users', async (req, res) => {
  try {
    const Users = await getCollection('users')
    let result = await Users.find({}).toArray()
    res.code(200).send(result)
  } catch (err) {
    res.code(500)
  }
})

/**
 * Add an user
 */
server.post('/users', async (req, res) => {
  const { username, name, email, birthday } = req.body
  try {
    const Users = await getCollection('users')
    await Users.insertOne({
      username: username,
      name: name,
      email: email,
      birthday: birthday,
      privilege: "normal",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.code(204)
  } catch (err) {
    res.code(500)
  }
})

/**
 * Get an user with id
 */
server.get('/users/:id', async (req, res) => {
  const id = req.params.id
  try {
    const Users = await getCollection('users')
    let result = await Users.findOne({ _id: new mongo.ObjectID(id) })
    res.code(200).send(result)
  } catch (err) {
    res.code(500)
  }
})

/**
 * Update an user with id
 */
server.post('/users/update/:id', async (req, res) => {
  const id = req.params.id
  const { username, name, email, birthday } = req.body
  try {
    const Users = await getCollection('users')
    await Users.updateOne(
      { _id: new mongo.ObjectID(id) },
      {
        $set: {
          username: username,
          name: name,
          email: email,
          birthday: birthday,
          updatedAt: new Date()
        }
      }
    )
    res.code(204)
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
