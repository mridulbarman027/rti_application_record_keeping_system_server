import { Request } from "express";

export const transfer3Party = async (args: {
    date: string,
    name: string,
    organization: string,
    matter_details: string
}, request: Request) => {
    try {
        if (!request.isAuth) {
            throw new Error('unauthenticated');
        }

        //date: String!
    } catch (e) {
        throw e;
    }
}