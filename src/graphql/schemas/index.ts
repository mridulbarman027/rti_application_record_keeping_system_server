import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type ApplicationStatus {
    submitted: String!
  }

  input ApplicationData {
    userid: String!
    applicant_name: String!
    application_date: String!
    mode_of_payment: String!
    payment_ref_no: String!
    application_topic: String!
  }
  
  type UserInfo {
    user_name: String!
    user_email: String!
    user_phone: String!
    user_address: String!
  }
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
    adminType: String!
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
    userInfo(user_id: String!): UserInfo
  }

  type RootMutation {
    userSignup(userSignupInput: UserSignupInput): SignupStatus
    createApplication(applicationData: ApplicationData): ApplicationStatus
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);