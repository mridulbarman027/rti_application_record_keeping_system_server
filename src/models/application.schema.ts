import { model, Schema } from "mongoose";
import { DbCollections } from "../@types";

interface IReplyTransfer {
    date: object,
    name: string,
    organization: string,
    matter_details: string
}

interface IApplication extends Document {
    userid: string,
    applicant_name: string,
    application_date: object,
    mode_of_payment: string,
    payment_ref_no: string,
    application_topic: string,
    application_desc: string,
    application_time: object,
    application_admin: number,
    application_closed: boolean,
    reply_viewed: boolean
    reply_3party: boolean
    reply_3party_details: IReplyTransfer,
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
        type: Date,
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
    application_desc: {
        type: String
    },
    application_time: {
        type: Date,
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
    reply_viewed: {
        type: Boolean,
        required: true
    },
    reply_3party: {
        type: Boolean
    },
    reply_3party_details: {
        type: {
            date: Object,
            name: String,
            organization: String,
            matter_details: String
        }
    }
});

export const ApplicationModel = model<IApplication>(DbCollections.applications, applicationSchema);