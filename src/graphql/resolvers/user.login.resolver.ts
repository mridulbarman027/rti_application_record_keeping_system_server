import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from "../../models/user.schema";
import { devJwtSecret } from '../../utils';

export const userLogin = async (args: { user_email: string, user_password: string }) => {
    const user = await UserModel.findOne({ user_email: args.user_email });

    if (!user) {
        throw new Error('User does not exist!');
    }

    const isEqual = await bcrypt.compare(args.user_password, user.user_password);
    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }

    const token = jwt.sign(
        { id: user.id, user_email: user.user_email },
        devJwtSecret,
        {
            expiresIn: '600h'
        }
    );

    return { userId: user.id, token: token, tokenExpiration: 600 };
}