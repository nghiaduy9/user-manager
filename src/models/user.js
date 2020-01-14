const _id = {
  bsonType: 'objectId',
  description: 'ID of the user'
}

const username = {
  bsonType: ['string', 'null'],
  minLength: 6,
  maxLength: 24,
  pattern: '^[A-Za-z0-9]+$',
  description: 'username'
}

const name = {
  bsonType: 'string',
  minLength: 6,
  maxLength: 48,
  description: "User's full name"
}

const avatar = {
  bsonType: 'string',
  description: "User's avatar URL"
}

const email = {
  bsonType: 'string',
  minLength: 6,
  maxLength: 256,
  description: "User's email"
}

const birthday = {
  bsonType: ['date', 'null'],
  description: "User's birthday"
}

const linkedAccounts = {
  bsonType: 'object',
  required: ['facebook', 'messenger'],
  properties: {
    facebook: {
      bsonType: 'string',
      minLength: 16,
      maxLength: 16,
      description: 'Facebook app-scoped ID'
    },
    messenger: {
      bsonType: 'string',
      minLength: 16,
      maxLength: 21,
      description: 'Facebook page-scoped ID for Messenger'
    }
  },
  description: "User's linked services, mapping from service names to account IDs"
}

const privilege = {
  enum: ['normal'],
  description: "User's privilege"
}

const createdAt = {
  bsonType: 'date',
  description: 'Time at which the user was created'
}

const updatedAt = {
  bsonType: 'date',
  description: 'Time at which the data was last updated'
}

const User = {
  bsonType: 'object',
  required: [
    '_id',
    'name',
    'avatar',
    'email',
    'linkedAccounts',
    'privilege',
    'createdAt',
    'updatedAt'
  ],
  properties: {
    _id,
    username,
    name,
    avatar,
    email,
    birthday,
    linkedAccounts,
    privilege,
    createdAt,
    updatedAt
  }
}

module.exports = { User }
