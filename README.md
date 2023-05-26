## Description

This project is a basic GraphQL server built with NestJS. It provides you with the ability to manage `Users` and `Products` in a connected way, where each user can own multiple products. This relationship is realized through a many-to-one linkage between users and products.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Schema

```graphql
type User {
  id: String!
  name: String!
  email: String!
  age: Int!
  orders: [Product!]!
}

type Product {
  id: String!
  name: String!
  price: Float!
  user: User!
}

type Query {
  product(id: String!): Product!
  products: [Product!]!
  users: [User!]!
  user(id: String!): User!
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): Product!
  createUser(createUserInput: CreateUserInput!): User!
  addOrder(addOrderInput: AddOrderInput!): User!
}

input CreateProductInput {
  # The name of the product
  name: String!

  # The price of the product
  price: Float!
}

input CreateUserInput {
  # Name of the user
  name: String!

  # Email of the user
  email: String!

  # Age of the user
  age: Int!
}

input AddOrderInput {
  # Id of the user
  userId: String!

  # Id of the product
  productId: String!
}
```

## Usage

The data is structured in two types - `User` and `Product`. Users have multiple orders (which are essentially products they own). Each product has a field denoting the user who owns it.

For more details, refer to the GraphQL schema in the original documentation.

To use this application, the intended flow is the following:

1. Create a user
2. Create a product
3. Attach a product to a user

In terms of GraphQL queries, this maps too.

1. Create a user

```graphql
mutation CreateUser {
  createUser(
    createUserInput: { name: "Test", email: "test@test.com", age: 1 }
  ) {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

This gives us the result:

```json
{
  "data": {
    "createUser": {
      "id": "25a58acf-6781-41f5-9449-7c63ac5bf916",
      "name": "Test",
      "email": "test@test.com",
      "age": 1,
      "orders": []
    }
  }
}
```

2. Create a product

```graphql
mutation CreateProduct {
  createProduct(createProductInput: { name: "Test", price: 12.123 }) {
    id
    name
    price
  }
}
```

This gives the result:

```json
{
  "data": {
    "createProduct": {
      "id": "acf58a8f-695e-473e-a6e6-74c38c662606",
      "name": "Test",
      "price": 12.123
    }
  }
}
```

3. Attach a product to a user

```graphql
mutation AddOrder {
  addOrder(
    addOrderInput: {
      userId: "25a58acf-6781-41f5-9449-7c63ac5bf916"
      productId: "a86fab18-b606-4446-805e-9d30832a3b29"
    }
  ) {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

This gives the result:

```json
{
  "data": {
    "addOrder": {
      "id": "25a58acf-6781-41f5-9449-7c63ac5bf916",
      "name": "Test",
      "email": "test@test.com",
      "age": 1,
      "orders": [
        {
          "id": "a86fab18-b606-4446-805e-9d30832a3b29",
          "name": "Test",
          "price": 12.123
        }
      ]
    }
  }
}
```

We can then query for users:

```graphql
query GetUsers {
  users {
    id
    name
    email
    age
    orders {
      id
      name
      price
    }
  }
}
```

We get the result:

```json
{
  "data": {
    "users": [
      {
        "id": "25a58acf-6781-41f5-9449-7c63ac5bf916",
        "name": "Test",
        "email": "test@test.com",
        "age": 1,
        "orders": [
          {
            "id": "a86fab18-b606-4446-805e-9d30832a3b29",
            "name": "Test",
            "price": 12.123
          }
        ]
      }
    ]
  }
}
```
