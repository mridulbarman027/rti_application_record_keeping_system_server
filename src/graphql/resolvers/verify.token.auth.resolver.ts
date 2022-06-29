import jwt from 'jsonwebtoken';
import { Request } from "express";
import { devJwtSecret } from '../../utils';
import { UserModel } from '../../models/user.schema';

export const adminVerifyToken = async (adminId: string, request: Request) => {
    let isVerified = false;
    if (request.isAuth) {
        isVerified = true;
    }
    return { isVerified }
}

export const userVerifyToken = async (token: {token: string}, request: Request) => {
    const tokenValue = token.token;
    let isVerified = false;
    if (request.isAuth) {
        isVerified = true;

        let decodedToken;
        try {
            decodedToken = jwt.verify(tokenValue, devJwtSecret) as { user_email: string };

            if (decodedToken) {
                
                const user_email = decodedToken.user_email;

                const user = await UserModel.findOne({ user_email: user_email });

                if (!user) {
                    isVerified = false;
                } else {
                    isVerified = true;
                }

            } else {
                isVerified = false;
            }

        } catch (error) {
            isVerified = false;
        }


    }
    return { isVerified }
}