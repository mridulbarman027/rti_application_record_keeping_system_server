import { buildSchema } from "graphql";

export const schema = buildSchema(`
  input ReplyTransferData {
    date: String!
    name: String!
    organization: String!
    matter_details: String!
  }

  input ReplyData {
    application_id: String!
    reply_from: String!
    reply_from_name: String
    reply_from_id: String!
    reply_type: String!
    reply_file: String!
    reply_transfer: Boolean
    reply_3party_details: ReplyTransferData
  }

  input SearchApplicationAdminData {
    adminId: String!
    dateRange: String
    searchQuery: String
  }

  type ReplyUpdateStatus {
    submitted: Boolean!
  }

  type ReplyList {
    id: String!
    application_id: String!
    reply_time: String!
    reply_from_id: String!
    reply_from_name: String!
    reply_from: String!
    reply_type: String!
    reply_file: String!
  }

  type Reply3Party {
    date: String!
    name: String!
    organization: String!
    matter_details: String!
  }

  type Application {
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
    reply_viewed: Boolean
    reply_3party: Boolean
    reply_3party_details: Reply3Party
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
    viewUserApplications: [Application!]
    getApplicationById(applicationId: String!): Application
    searchApplicaitonsAdmin(searchApplicationAdminData: SearchApplicationAdminData): [Application!]
  }

  type RootMutation {
    userSignup(userSignupInput: UserSignupInput): SignupStatus
    createApplication(applicationData: ApplicationData): ApplicationStatus
    updateReplyView(applicationId: String!): ReplyUpdateStatus
    sendReply(replyData: ReplyData): [ReplyList!]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);