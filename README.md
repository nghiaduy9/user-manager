# Night Watch user manager

## INSTALLATION

### Requirements

- Node.js >= 8
- MongoDB >= 3
- Dotenv files: `.env.production` and/or `.env.development`

### Instructions

```bash
$ yarn install
$ yarn start # yarn dev for development
```

## DOCUMENTATION

### Environment Variables

- `PORT` (number): Port number to run the server
- `MONGODB_URI` (string): MongoDB URI

### Routes

#### GET `/`

> Just for testing

##### Response body

- `iam`: `"/"`

#### GET `/users`

> Get all users

##### Response body

Array of objects:

- `_id` (string): ID of the user
- `username` (string): Username
- `name` (string): User's full name
- `email` (string): User's email
- `birthday` (string): User's birthday
- `privilege` (string): User's privilege
- `createdAt` (object): Time at which the user was created
- `updatedAt` (object): Time at which the user was updated

#### POST `/users`

> Add a new user

##### Request body

- `username` (string): Username
- `name` (string): User's fullname
- `email` (string): User's email
- `birthday` (string): User's birthday

#### GET `/users/:id`

> Get the user with `id`

##### Route parameters

- `id` (string): ID of the user

##### Response body

- `_id` (string): ID of the user
- `username` (string): Username
- `name` (string): User's fullname
- `email` (string): User's email
- `birthday` (string): User's birthday
- `privilege` (string): User's privilege
- `createdAt` (object): Time at which the user was created
- `updatedAt` (object): Time at which the user was updated

#### DELETE `/users/:id`

> Delete the user with `id`

##### Route parameters

- `id` (string): ID of the user
