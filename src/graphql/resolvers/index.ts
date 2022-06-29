import { adminLogin } from "./admin.login.resolvers";
import { userSignup } from "./user.signup.resolvers";
import { adminVerifyToken } from "./verify.token.auth.resolvers";

export const root = {
    adminLogin: adminLogin,
    adminVerifyToken: adminVerifyToken,
    userSignup: userSignup
}