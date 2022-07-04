import { model, Schema } from "mongoose";
import { DbCollections } from "../@types";

interface IReplyTransfer {
    date: object,
    name: string,
    organization: string,
    matter_detail: string
}

interface IReplies {
    replyid: string,
    reply_time: object,
    reply_mode: string,
    reply_from: number,
    reply_type: string,
    reply_doc_fees_details: string,
    reply_transfer: boolean,
    reply_3party_details: IReplyTransfer[]
}

interface IApplication extends Document {
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

export const applicationSchema = new Schema<IApplication>({
    userid: {
        type: String,
        required: true
    },
    applicant_name: {
        type: String,
        required: true
    },
    application_date: {
        type: Object,
        required: true
    },
    mode_of_payment: {
        type: String,
        required: true
    },
    payment_ref_no: {
        type: String
    },
    application_topic: {
        type: String,
        required: true
    },
    application_time: {
        type: Object,
        required: true
    },
    application_admin: {
        type: Number,
        required: true
    },
    application_closed: {
        type: Boolean,
        required: true
    },
    replies: {
        type: [{id:String, name:String}]
    },
});

export const ApplicationModel = model<IApplication>(DbCollections.applications, applicationSchema);