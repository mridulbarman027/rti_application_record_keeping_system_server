import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type AdminVerify {
    isVerified: Boolean!
  }

  type AdminAuthData {
    adminId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type RootQuery {
    adminLogin(username: String!, password: String!): AdminAuthData!
    adminVerifyToken(adminId: String): AdminVerify!
  }

  type RootMutation {
    createEvent(name: String): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);