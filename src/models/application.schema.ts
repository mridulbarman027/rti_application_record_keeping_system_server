import { model, Schema } from "mongoose";
import { DbCollections } from "../@types";

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
    reply_viewed: boolean
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
    }
});

export const ApplicationModel = model<IApplication>(DbCollections.applications, applicationSchema);