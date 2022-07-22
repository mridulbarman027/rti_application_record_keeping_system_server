import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type ReplyTransfer {
    date: String!
    name: String!
    organization: String!
    matter_details: String!
  }

  type ReplyList {
    id: String!
    application_id: String!
    reply_time: String!
    reply_mode: String!
    reply_from: String!
    reply_type: String!
    reply_file: String!
    reply_transfer: Boolean!
    reply_3party_details: [ReplyTransfer]
  }

  type ApplicationList {
    id: String!
    userid: String!
    applicant_name: String!
    application_date: String!
    mode_of_payment: String!
    payment_ref_no: String
    application_topic: String!
    application_time: String!
    application_admin: String
    application_closed: Boolean
    replies: [ReplyList]
  }

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
    viewUserApplications: [ApplicationList!]
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