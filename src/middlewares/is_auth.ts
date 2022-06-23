import { RequestAdmin } from './../global/index';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from "express";

export const isAuth = (req: RequestAdmin, res: Response, next: NextFunction) => {
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