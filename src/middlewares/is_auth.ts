import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            isAuth: boolean,
            userId: string
        }
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];

    if(!token || token == '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey') as {userId: string, token: string, tokenExpiration: number};
    } catch (error) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

}