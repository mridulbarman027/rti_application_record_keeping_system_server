import { searchApplicaitonsAdmin } from './search.applications.admin';
import { updateReplyView } from './reply.update.resolver';
import { getApplicationById } from './application.get.resolver';
import { viewUserApplications } from './applications.list.get.resolver';
import { createApplication } from './application.create.resolver';
import { adminLogin } from "./admin.login.resolver";
import { userInfo } from "./user.info.resolver";
import { userLogin } from "./user.login.resolver";
import { userSignup } from "./user.signup.resolver";
import { adminVerifyToken, userVerifyToken } from "./verify.token.auth.resolver";

export const root = {
    adminLogin: adminLogin,
    adminVerifyToken: adminVerifyToken,
    userSignup: userSignup,
    userLogin: userLogin,
    userVerifyToken,
    userInfo: userInfo,
    createApplication,
    viewUserApplications,
    getApplicationById,
    updateReplyView,
    searchApplicaitonsAdmin
}