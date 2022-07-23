import { Request } from "express";
import { ApplicationModel } from "../../models/application.schema";

export const updateReplyView = async (args: { applicationId: string }, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        const application = await ApplicationModel.findById(args.applicationId);

        if (application?._id) {
            
            await application.updateOne({ reply_viewed: true });

        } else {
            return { status: false };
        }

        return { status: true };
    } catch (e) {
        throw e;
    }
}