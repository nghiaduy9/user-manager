const Id = {
  bsonType: 'objectId',
  minLength: 24,
  maxLength: 24,
  description: 'ID of the user'
}

const Username = {
  bsonType: ['string', 'null'],
  minLength: 6,
  maxLength: 24,
  pattern: '^[A-Za-z0-9]{6, 24}$',
  description: 'Username'
}

const Name = {
  bsonType: 'string',
  minLength: 6,
  maxLength: 48,
  description: "User's full name"
}

const Avatar = {
  bsonType: 'string',
  description: "User's avatar"
}

const Email = {
  bsonType: 'string',
  minLength: 6,
  maxLength: 256,
  description: "User's email"
}

const Birthday = {
  bsonType: ['date', 'null'],
  description: "User's birthday"
}

const LinkedAccounts = {
  bsonType: 'object',
  required: ['facebook'],
  properties: {
    facebook: {
      bsonType: 'string',
      minLength: 16,
      maxLength: 16,
      description: 'Facebook ID'
    }
  },
  description: "User's linked services, mapping from service names to account IDs"
}

const Privilege = {
  enum: ['normal'],
  description: "User's privilege"
}

const CreatedAt = {
  bsonType: 'date',
  description: 'Time at which the user was created'
}

const UpdatedAt = {
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
    _id: Id,
    username: Username,
    name: Name,
    avatar: Avatar,
    email: Email,
    birthday: Birthday,
    linkedAccounts: LinkedAccounts,
    privilege: Privilege,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt
  }
}

module.exports = { User }
