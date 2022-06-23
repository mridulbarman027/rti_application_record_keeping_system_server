import { Request } from "express";

export interface RequestAdmin extends Request {
    isAuth: boolean,
    userId: string
}