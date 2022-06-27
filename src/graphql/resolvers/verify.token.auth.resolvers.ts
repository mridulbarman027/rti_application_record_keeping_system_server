import { Request } from "express";

export const adminVerifyToken = async (adminId: String, request: Request) => {
    let isVerified = false;
    if (request.isAuth) {
        isVerified = true;
    }
    return { isVerified }
}