import { model, Schema } from "mongoose";

export interface IAdmin extends Document {
    admin_username: string,
    admin_password: string,
}

export const adminSchema = new Schema<IAdmin>({
    admin_username: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    }
});

export const AdminModel = model<IAdmin>('Admin', adminSchema);