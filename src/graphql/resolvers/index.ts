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
}