import express, { Request, Response, NextFunction } from 'express'
import { UserModel } from '../4-models/user-model';
import authLogic from '../5-logics/auth-logic';
import CredentialModel from '../4-models/credential-model';

const router = express.Router()

// Register  
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        const token = authLogic.register(user)
        response.json(token)
    }
    catch (err: any) {
        next(err);
    }
});

// Login  
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credential = new CredentialModel(request.body)
        const token = await authLogic.login(credential)
        response.json(token)
    }
    catch (err: any) {
        next(err);
    }
});

export default router