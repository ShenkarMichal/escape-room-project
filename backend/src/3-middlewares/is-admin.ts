import { NextFunction, Request, Response } from "express";
import { UnauthorizedErrorModel } from "../4-models/error-models";
import cyber from "../2-utils/cyber";

async function isAdmin(request: Request, response: Response, next: NextFunction){

    const isAdmin = await cyber.verifyAdmin(request)
    if(!isAdmin){
        const err = new UnauthorizedErrorModel("You are an admin!")
        next(err)
    }
    next()
}

export default isAdmin