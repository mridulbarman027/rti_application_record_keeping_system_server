import { UserModel } from "../../models/user.schema";
import { Request } from 'express';

interface IUserInfo {
    user_name?: string;
    user_email?: string;
    user_phone?: string;
    user_address?: string;
}

export const userInfo = async (user_id: {user_id: string}, request: Request) => {
    let result: IUserInfo = {};

    if (!request.isAuth) {
        return result;
    }

    const id = user_id.user_id;
    
    const user = await UserModel.findById(id);

    if (!user) {
        return result;
    }

    result.user_name = user.user_name;
    result.user_email = user.user_email;
    result.user_phone = user.user_phone;
    result.user_address = user.user_address;

    return result;
}