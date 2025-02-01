import express, { NextFunction, Request, Response } from 'express'
import riddleLogic from '../5-logics/riddle-logic'
import { ValidationErrorModel } from '../4-models/error-model'
import mongoose from 'mongoose'
import { RiddleModel } from '../4-models/riddle-model'
import { MazeNodeModel } from '../4-models/maze-node-model'

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
router.post("/maze/answer/:riddleId/:userId", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const riddleId = request.params.riddleId
        const userId = request.params.userId
        const { answer } = request.body
        if(!answer) throw new ValidationErrorModel("Answer is required")
        if(!mongoose.isValidObjectId(riddleId)) throw new ValidationErrorModel("riddleId is not correct")
        if(!mongoose.isValidObjectId(userId)) throw new ValidationErrorModel("userId is not correct")
        const check = await riddleLogic.checkAnswer(riddleId,userId, answer)
        response.json({nextNodes: check, message: check ? "Correct answer" : "Uncorrect answer"})
    }
    catch (err: any) {
        next(err)        
    }
})

//GET choose node
router.get("/maze/node/:nodeId/:userId", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const nextNode = request.params.nodeId
        const userId = request.params.userId
        if(!mongoose.isValidObjectId(nextNode)) throw new ValidationErrorModel("nodeId is not correct")
        if(!mongoose.isValidObjectId(userId)) throw new ValidationErrorModel("userId is not correct")
        const riddle = await riddleLogic.chooseNextNode(nextNode,userId)
        response.json({_id: riddle._id, question: riddle.question})
    }
    catch (err: any) {
        next(err)        
    }
})

//POST add riddle
router.post("/riddles/", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const riddle = new RiddleModel(request.body)
        const newRiddle = await riddleLogic.addRiddle(riddle)
        response.json(newRiddle)
    }
    catch (err: any) {
        next(err)        
    }
})

//GET fetch the maze
router.get("/maze/", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const maze = await riddleLogic.fetchMaze()
        response.json(maze)
    }
    catch (err: any) {
        next(err)        
    }
})

//POST add node to the maze
router.post("/maze/node", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const node = new MazeNodeModel(request.body)
        const newNode = await riddleLogic.addMazeNode(node)
        response.json(newNode)
    }
    catch (err: any) {
        next(err)        
    }
})

export default router

