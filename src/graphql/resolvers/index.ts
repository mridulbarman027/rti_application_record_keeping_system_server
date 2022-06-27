import { adminLogin } from "./admin.login.resolvers";
import { adminVerifyToken } from "./verify.token.auth.resolvers";

export const root = {
    adminLogin: adminLogin,
    adminVerifyToken: adminVerifyToken
}