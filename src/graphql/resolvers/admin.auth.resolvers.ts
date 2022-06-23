import { AdminModel } from './../../models/admin.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (args: { username: string, password: string }) => {
    const user = await AdminModel.findOne({ admin_username: args.username });

    if (!user) {
        throw new Error('User does not exist!');
    }

    const isEqual = await bcrypt.compare(args.password, user.admin_password);
    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }

    const token = jwt.sign(
        { id: user.id, admin_username: user.admin_username },
        'somesupersecretkey',
        {
            expiresIn: '1h'
        }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
}