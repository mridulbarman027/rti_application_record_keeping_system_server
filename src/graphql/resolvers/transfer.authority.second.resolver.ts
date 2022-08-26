import { Request } from "express";
import { ApplicationModel } from "../../models/application.schema";
import { ReplyModel } from "../../models/reply.schema";

export const transferAuthoritySecond = async (args: {applicationId: string, fromId: string}, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        if (!args.applicationId || !args.fromId) {
            throw new Error('invalid data 1');
        }

        const replyValid = await ReplyModel.find({ application_id: args.applicationId });

        if (replyValid.length < 1) {
            throw new Error('invalid data 2');
        }

        const application = await ApplicationModel.findById(args.applicationId);

        await application?.updateOne({ application_admin: 3});

        console.log("SAd");

        return { submitted: true }

    } catch (e) {
        throw e;
    }
}