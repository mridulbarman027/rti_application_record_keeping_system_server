import { Request } from "express";
import { IReplyTransfer } from "../../@types";
import { ApplicationModel } from "../../models/application.schema";
import { ReplyModel } from "../../models/reply.schema";

export const transfer3Party = async (args: { partyData: {
    applicationId: string,
    date: string,
    name: string,
    organization: string,
    matter_details: string
} }, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        if (
            !args.partyData.applicationId ||
            !args.partyData.date ||
            !args.partyData.name ||
            !args.partyData.organization ||
            !args.partyData.matter_details
        ) {
            throw new Error('invalid data');
        }

        const application = await ApplicationModel.findById(args.partyData.applicationId);

        if (!application) {
            throw new Error('invalid application');
        }

        const reply3party: IReplyTransfer = {
            name: args.partyData.name,
            date: new Date(args.partyData.date),
            organization: args.partyData.organization,
            matter_details: args.partyData.matter_details
        };

        await application.updateOne({
            reply_3party: true,
            reply_3party_details: reply3party,
            application_closed: true,
            reply_viewed: false
        });

        const applicationLatest = await ApplicationModel.findById(args.partyData.applicationId);

        if (applicationLatest) {
            const replies = await ReplyModel.find({ application_id: applicationLatest.id });
            replies.map(reply => {
                return { ...reply, id: reply._id }
            });
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
                reply_3party: application.reply_3party,
                reply_3party_details: application.reply_3party_details,
                replies: replies
            };

            return result;
        }

    } catch (e) {
        throw e;
    }
}