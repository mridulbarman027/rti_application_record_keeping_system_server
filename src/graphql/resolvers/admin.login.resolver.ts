import { Admin } from '../../models/admin.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { devJwtSecret } from '../../utils';

export const adminLogin = async (args: { username: string, password: string }) => {
    const user = await Admin.findOne({ admin_username: args.username });

    if (!user) {
        throw new Error('User does not exist!');
    }

    const isEqual = await bcrypt.compare(args.password, user.admin_password);
    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }

    const token = jwt.sign(
        { id: user.id, admin_username: user.admin_username },
        devJwtSecret,
        {
            expiresIn: '100h'
        }
    );

    return { adminId: user.id, adminType: user.admin_type, token: token, tokenExpiration: 100 };
}