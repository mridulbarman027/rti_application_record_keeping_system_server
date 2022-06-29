import { UserModel } from './../../models/user.schema';
import bcrypt from 'bcryptjs';

export const userSignup = async (args: { userSignupInput : { user_name: string, user_email: string, user_phone: string, user_password: string, user_address: string }}) => {
    try {
        const user = await UserModel.findOne({ user_email: args.userSignupInput.user_email });

        if (user) {
            throw new Error('User already exist!');
        }

        const hashedPassword = await bcrypt.hash(args.userSignupInput.user_password, 12);

        const userSignupModel = new UserModel({
            user_name: args.userSignupInput.user_name,
            user_email: args.userSignupInput.user_email,
            user_phone: args.userSignupInput.user_password,
            user_password: hashedPassword,
            user_address: args.userSignupInput.user_address,
            user_time: new Date()
        });

        await userSignupModel.save();

        return { status: 'success' };
    } catch (e) {
        throw e;
    }
}