import { DbCollections } from '../@types/index';
import { model, Schema } from "mongoose";

export interface IUserSignup extends Document {
    user_name: string,
    user_email: string,
    user_phone: string,
    user_password: string,
    user_address: string,
    user_time: object
}

export const userSignupSchema = new Schema<IUserSignup>({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_address: {
        type: String,
        required: true
    },
    user_time: {
        type: Object,
        required: true
    }
});

export const UserModel = model<IUserSignup>(DbCollections.users, userSignupSchema);