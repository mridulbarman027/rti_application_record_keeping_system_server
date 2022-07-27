import { Request } from "express";
import { ApplicationModel } from "../../models/application.schema"
import { ReplyModel } from "../../models/reply.schema";

export const viewUserApplications = async (args: {}, request: Request) => {
    if (!request.isAuth) {
        throw new Error('unauthenticated');
    }

    const application = await ApplicationModel.find();

    const result = application.map(async (app) => {
        const replies = await ReplyModel.find({ application_id: app.id });
        return {
            id: app.id,
            userid: app.userid,
            applicant_name: app.applicant_name,
            application_date: app.application_date,
            mode_of_payment: app.mode_of_payment,
            payment_ref_no: app.payment_ref_no,
            application_topic: app.application_topic,
            application_time: app.application_time,
            application_admin: app.application_admin,
            application_closed: app.application_closed,
            reply_viewed: app.reply_viewed,
            reply_3party: app.reply_3party,
            reply_3party_details: app.reply_3party_details,
            replies: replies
        };
    });

    return result;

}