const { ObjectID } = require('mongodb')
const nanoid = require('nanoid/async')

module.exports = (server, opts, next) => {
  const { mongol } = opts
  const userCollection = mongol.database.collection('users')

  server.get('/', async (req, res) => {
    try {
      let result = await userCollection.find({}).toArray()
      res.status(200).send(result)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.post('/', async (req,res) => {
    const { username, name, avatar, email, birthday, linkedAccounts } = req.body
    try {
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
      res.status(200).send({ _id: insertedId})
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/:id', async (req, res) => {
    const _id = new ObjectID(req.params.id)
    try {
      let result = await userCollection.findOne({ _id })
      res.status(200).send(result)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/linkedAccounts/:service/:id', async (req, res) => {
    const { service, id } = req.params
    try {
      const user = await userCollection.findOne({
        ['linkedAccounts.' + service] : id
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
      await userCollection.updateOne(
        {
          ['linkedAccounts.' + service] : id
        },
        {
          $set: {
            ['linkedAccounts.' + service]: newID
          },
          $currentDate: { updatedAt: true}
        }
      )
      res.status(204)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/users/linkedAccounts/:service/:id', async (req, res) => {
    const { service, id } = req.params
    const query = {
      ["linkedAccounts." + service] : id
    }
    try {
      const user = await userCollection.findOne(query)
      res.code(200).send(user)
    } catch (err) {
      res.code(500)
    }
  })

  next()
}