# Night Watch user manager

## INSTALLATION

### Requirements

- Node.js >= 12.0.0
- MongoDB >= 3

## DOCUMENTATION

### Environment Variables

- `NODE_ENV` (string): "development" or "production" environment
- `PORT` (number): Port number to run the server
- `MONGODB_URI` (string): MongoDB URI
- `MONGODB_DB_NAME` (string): Database name

### Routes

#### 1. GET `/`

> Get all users

##### Response body

Array of user objects:
See [User schema][0].

#### 2. POST `/`

> Create a new user

##### Request body

- `username` (string): Username
- `name` (string): User's full name
- `avatar` (string): User's avatar
- `email` (string): User's email
- `birthday` (Date): User's birthday
- `linkedAccounts` (object): User's linked services, mapping from service names to account IDs
  - `facebook` (string): Facebook ID

##### Response body

- `_id` (ObjectID) : ID of newly created user

#### 3. GET `/:id`

> Get an user via ID

##### Route parameters

- `id` (ObjectID): ID of the user

##### Response body

See [User schema][0].

#### 4. GET `/linkedAccounts/:service/:id`

> Get an user via linked social network accounts

##### Route parameters

- `service` (string): Service name
- `id` (string): Account ID

##### Response body

See [User schema][0].

#### 5. PUT `/linkedAccounts/:service/:id/:newID`

> Update the ID of a linked social network account

##### Route parameters

- `service` (string): Service name
- `id` (string): Old ID
- `newID` (string): New ID

[0]: https://github.com/night-watch-project/user-manager/blob/master/src/models/user.js
