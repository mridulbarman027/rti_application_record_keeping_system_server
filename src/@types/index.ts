export enum DbCollections {
  admins = 'admins',
  users = 'users',
  applications = 'applications',
  replies = 'replies'
}

export interface IReplyTransfer {
  date: object,
  name: string,
  organization: string,
  matter_detail: string
}

export interface IReplies {
  replyid: string,
  reply_time: object,
  reply_mode: string,
  reply_from: number,
  reply_type: string,
  reply_doc_fees_details: string,
  reply_transfer: boolean,
  reply_3party_details: IReplyTransfer[]
}

export interface IApplication {
  userid: string,
  applicant_name: string,
  application_date: object,
  mode_of_payment: string,
  payment_ref_no: string,
  application_topic: string,
  application_time: object,
  application_admin: number,
  application_closed: boolean,
  replies: IReplies[]
}