import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { devJwtSecret } from '../utils';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    //const token = authHeader.split(' ')[1];

    const token = authHeader;

    if(!token || token == '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, devJwtSecret) as {userId: string, token: string, tokenExpiration: number};
    } catch (error) {
        console.log(error);
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