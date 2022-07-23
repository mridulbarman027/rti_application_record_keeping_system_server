import { ApplicationModel } from './../../models/application.schema';
import { Request } from "express";
import { ReplyModel } from '../../models/reply.schema';

export const getApplicationById = async (args: {applicationId: string}, request: Request) => {
    if (!request.isAuth) {
        throw new Error('unauthenticated');
    }

    const application = await ApplicationModel.findById(args.applicationId);

    if (application) {
        const replies = await ReplyModel.find({ application_id: application.id });
        const result = {
            id: application.id,
            userid: application.userid,
            applicant_name: application.applicant_name,
            application_date: application.application_date,
            mode_of_payment: application.mode_of_payment,
            payment_ref_no: application.payment_ref_no,
            application_topic: application.application_topic,
            application_time: application.application_time,
            application_admin: application.application_admin,
            application_closed: application.application_closed,
            reply_viewed: application.reply_viewed,
            replies: replies
        };
    
        return result;
    }

    return {};

}