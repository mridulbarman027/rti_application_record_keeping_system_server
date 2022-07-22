import { Request } from "express";
import { ApplicationModel } from "../../models/application.schema";

export const createApplication = async (args: { applicationData : { userid: string, applicant_name: string, application_date: string, mode_of_payment: string, payment_ref_no: string, application_topic: string }}, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        const userid = args.applicationData.userid;
        const applicant_name = args.applicationData.applicant_name;
        const application_date = args.applicationData.application_date;
        const mode_of_payment = args.applicationData.mode_of_payment;
        const payment_ref_no = args.applicationData.payment_ref_no;
        const application_topic = args.applicationData.application_topic;

        const application = new ApplicationModel({
            userid: userid,
            applicant_name: applicant_name,
            application_date: application_date,
            mode_of_payment: mode_of_payment,
            payment_ref_no: payment_ref_no,
            application_topic: application_topic,
            application_time: new Date(),
            application_admin: 1,
            application_closed: false,
            reply_viewed: false,
        });

        await application.save();

        return { submitted: "success" };
    } catch (e) {
        throw e;
    }
}