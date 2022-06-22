import { model, ObjectId, Schema } from "mongoose";

export interface IAdmin extends Document {
    _id: ObjectId,
    admin_username: String,
    admin_password: String,
    admin_name: String,
    admin_type: Number
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
    admin_name: {
        type: String,
        required: true
    },
    admin_type: {
        type: Number,
        required: true
    }
});

export const Admin = model<IAdmin>("Admin", adminSchema);