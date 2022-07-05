import { DbCollections } from './../@types/index';
import { model, Schema } from "mongoose";

export interface IAdmin extends Document {
    admin_username: string,
    admin_password: string,
    admin_type: string,
}

export const adminSchema = new Schema<IAdmin>({
    admin_username: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    },
    admin_type: {
        type: String
    }
});

export const Admin = model<IAdmin>(DbCollections.admins, adminSchema);