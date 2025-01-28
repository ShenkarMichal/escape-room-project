import express, { NextFunction, Request, Response } from 'express'
import riddleLogic from '../5-logics/riddle-logic'
import { ValidationErrorModel } from '../4-models/error-model'
import mongoose from 'mongoose'

const router = express.Router()

//GET fetch all riddles
router.get("/riddles", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const riddles = await riddleLogic.fetchAllRiddles()
        response.json(riddles)
    }
    catch (err: any) {
        next(err)        
    }
})

//POST check answer
router.post("/answer/:riddleId", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const riddleId = request.params.riddleId
        const { answer, userId } = request.body
        if(!answer) throw new ValidationErrorModel("Answer is required")
        if(!mongoose.isValidObjectId(riddleId)) throw new ValidationErrorModel("riddleId is not correct")
        if(!mongoose.isValidObjectId(userId)) throw new ValidationErrorModel("userId is not correct")
        const check = await riddleLogic.checkAnswer(riddleId,userId, answer)
        response.json({success: check, message: check ? "Correct answer" : "Uncorrect answer"})
    }
    catch (err: any) {
        next(err)        
    }
})

export default router

