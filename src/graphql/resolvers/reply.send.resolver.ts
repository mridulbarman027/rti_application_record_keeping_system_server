import { Request } from "express";
import { AdminModel } from "../../models/admin.schema";
import { ApplicationModel } from "../../models/application.schema";
import { ReplyModel } from "../../models/reply.schema";

export const sendReply = async (args: { replyData : { 
    application_id: string,
    reply_from: string,
    reply_from_id: string,
    reply_type: string,
    reply_file: string,
    reply_transfer: boolean,
    reply_3party_details: {
        date: string,
        name: string,
        organization: string,
        matter_detail: string
    },
 }}, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }
        
        if (
            !args.replyData.application_id || 
            !args.replyData.reply_from || 
            !args.replyData.reply_from_id || 
            !args.replyData.reply_type
        ) {
            throw new Error('invalid data 1');
        }

        const application = await ApplicationModel.findById(args.replyData.application_id);

        if (!application) {
            throw new Error('invalid data 2');
        }

        const replyLastList = await ReplyModel.find({ application_id: args.replyData.application_id, reply_from_id: args.replyData.reply_from_id });

        if (replyLastList.length > 1) {
            throw new Error('invalid reply');
        }

        const admin = await AdminModel.findById(args.replyData.reply_from_id);

        const reply = new ReplyModel({
            application_id: args.replyData.application_id,
            reply_time: new Date(),
            reply_from: args.replyData.reply_from,
            reply_from_name: admin?.admin_name,
            reply_from_id: args.replyData.reply_from_id,
            reply_type: args.replyData.reply_type,
            reply_file: args.replyData.reply_file,
        });

        await reply.save();

        let count = 1;
        replyLastList.map(replyLast => {
            const lastReplyFromId = replyLast.reply_from_id;
            if (lastReplyFromId === args.replyData.reply_from_id) {
                count++;
            }
        });

        if (count > 1) {
            await application.updateOne({ reply_viewed: false, application_closed: true });
        } else {
            await application.updateOne({ reply_viewed: false });
        }


        const replies = await ReplyModel.find({'application_id': args.replyData.application_id});

        replies.map(reply => {
            return { ...reply, id: reply._id }
        });

        return replies;
    } catch (e) {
        throw e;
    }
}