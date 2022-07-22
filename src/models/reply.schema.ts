import { model, Schema } from "mongoose";
import { DbCollections } from "../@types";

interface IReplyTransfer {
    date: object,
    name: string,
    organization: string,
    matter_detail: string
}

export interface IReply extends Document {
    application_id: string,
    reply_time: object,
    reply_mode: string,
    reply_from: number,
    reply_type: string,
    reply_file: string,
    reply_transfer: boolean,
    reply_3party_details: IReplyTransfer[],
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
    reply_mode: {
        type: String,
        required: true
    },
    reply_from: {
        type: Number,
        required: true
    },
    reply_type: {
        type: String,
        required: true
    },
    reply_file: {
        type: String
    },
    reply_transfer: {
        type: Boolean,
        required: true
    },
    reply_3party_details: {
        type: [{id: String, name: String}]
    }
});

export const ReplyModel = model<IReply>(DbCollections.replies, replySchema);