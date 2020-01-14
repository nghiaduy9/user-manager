const { MongoClient } = require('mongodb')
const { userSchema } = require('./models/user')

const { MONGODB_URI, MONGODB_DB_NAME } = process.env
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true })

const getCollection = async (name) => {
  if (!client.isConnected()) await client.connect()
  const db = client.db(MONGODB_DB_NAME)
  // Create collection if it doesn't exist
  const collections = await db.collections()
  if (
    !collections.map((collection) => collection.s.namespace.collection).includes(name)
  ) {
    await db.createCollection(name, {
      validator: { $jsonSchema: userSchema }
    })
  }
  return db.collection(name)
}

const closeConnection = async () => client.close()

module.exports = { getCollection, closeConnection }
