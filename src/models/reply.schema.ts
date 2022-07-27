import { model, Schema } from "mongoose";
import { DbCollections } from "../@types";

export interface IReply extends Document {
    application_id: string,
    reply_time: object,
    reply_from: string,
    reply_from_name: string,
    reply_from_id: string,
    reply_type: string,
    reply_file: string,
}

export const replySchema = new Schema<IReply>({
    application_id: {
        type: String,
        required: true
    },
    reply_time: {
        type: Object,
        required: true
    },
    reply_from: {
        type: String,
        required: true
    },
    reply_from_name: {
        type: String,
        required: true
    },
    reply_from_id: {
        type: String,
        required: true
    },
    reply_type: {
        type: String,
        required: true
    },
    reply_file: {
        type: String
    }
});

export const ReplyModel = model<IReply>(DbCollections.replies, replySchema);