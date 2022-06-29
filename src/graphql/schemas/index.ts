import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type UserVerify {
    isVerified: Boolean!
  }

  type UserAuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type SignupStatus {
    status: String!
  }

  type AdminVerify {
    isVerified: Boolean!
  }

  type AdminAuthData {
    adminId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserSignupInput {
    user_name: String!
    user_email: String!
    user_phone: String!
    user_password: String!
    user_address: String!
  }

  type RootQuery {
    adminLogin(username: String!, password: String!): AdminAuthData!
    adminVerifyToken(adminId: String): AdminVerify!
    userLogin(user_email: String!, user_password: String!): UserAuthData
    userVerifyToken(token: String!): UserVerify!
  }

  type RootMutation {
    userSignup(userSignupInput: UserSignupInput): SignupStatus
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);