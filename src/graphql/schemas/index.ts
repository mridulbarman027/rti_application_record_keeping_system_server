import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Admin {
    adminId: ID!
    username: String!
    password: String
  }
  type AdminAuthData {
    adminId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input AdminInput {
    username: String!
    password: String!
  }

  type RootQuery {
    adminLogin(username: String!, password: String!): AdminAuthData!
  }
  type RootMutation {
    createEvent(name: String): String
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);