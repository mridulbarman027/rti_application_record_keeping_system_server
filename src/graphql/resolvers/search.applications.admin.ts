import { Request } from "express";
import { AdminModel } from "../../models/admin.schema";
import { ApplicationModel } from "../../models/application.schema";
import { ReplyModel } from "../../models/reply.schema";

export const searchApplicaitonsAdmin = async (args: { searchApplicationAdminData: { adminId: string, dateRange: string, searchQuery: string } }, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        const adminId = args.searchApplicationAdminData.adminId;
        const dateRange = args.searchApplicationAdminData.dateRange;
        const searchQuery = args.searchApplicationAdminData.searchQuery;

        if (!adminId) {
            throw new Error('Invalid Admin');
        }

        const admin = await AdminModel.findById(adminId);

        if (!admin) {
            throw new Error('Invalid Admin');
        }

        const adminType = admin.admin_type;     	//[1, 2, 1 -> state_public_infromation_officier, 2 -> appellate_authority]

        let application;

        if (dateRange && dateRange.length > 1) {
            const startDateMs = new Date(dateRange.split(',')[0].trim()).getTime();
            const endDateMs = new Date(dateRange.split(',')[1].trim()).getTime();
            const startDate = new Date(startDateMs + (19800 * 1000));   //to convert utc into indian standard time
            const endDate = new Date(endDateMs + (19800 * 1000));

            if (searchQuery && searchQuery.length > 0) {

                application = await ApplicationModel.find({
                    application_admin: adminType,
                    '$or': [{
                        applicant_name: { '$regex': `${searchQuery}`, '$options' : 'i' }
                    }, {
                        application_topic: { '$regex': `${searchQuery}`, '$options' : 'i' }
                    }],
                    application_date: {
                        '$gte': startDate,
                        '$lte': endDate
                    }
                });

            } else {

                application = await ApplicationModel.find({
                    application_admin: adminType,
                    application_date: {
                        '$gte': startDate,
                        '$lte': endDate
                    }
                });

            }
        } else {
            if (searchQuery && searchQuery.length > 0) {

                application = await ApplicationModel.find({
                    application_admin: adminType,
                    '$or': [{
                        applicant_name: { '$regex': `${searchQuery}`, '$options' : 'i' }
                    }, {
                        application_topic: { '$regex': `${searchQuery}`, '$options' : 'i' }
                    }]
                });

            } else {

                application = await ApplicationModel.find({
                    application_admin: adminType
                });

            }
        }

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
                replies: replies
            };
        });

        return result;

        //Sat Jul 2 2022 00:00:00 GMT+0530 (India Standard Time), Date Fri Jul 22 2022 00:00:00 GMT+0530 (India Standard Time)

    } catch (e) {
        throw e;
    }
}