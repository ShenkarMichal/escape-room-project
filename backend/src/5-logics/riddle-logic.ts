import mongoose from "mongoose";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model";
import { IMazeNodeModel, MazeNodeModel } from "../4-models/maze-node-model";
import { IRiddleModel, RiddleModel } from "../4-models/riddle-model";
import { UserModel } from "../4-models/user-model";
import { UserRiddleModel } from "../4-models/user-riddle-model";

function fetchAllRiddles(): Promise<IRiddleModel[]> {
    return RiddleModel.find().exec()    
}

function addRiddle(riddle: IRiddleModel): Promise<IRiddleModel> {
    //validation:
    const err = riddle.validateSync()
    if(err) throw new ValidationErrorModel(err.message)

    return riddle.save()
}

async function checkAnswer(riddleId: string, userId: string, answer: string): Promise<IMazeNodeModel[] > {

    const user =  await UserModel.findById(userId).populate("currentNode").exec()
    if(!user || !user.currentNode) throw new ValidationErrorModel("User or Node does not exists")
    const node = user.currentNode
    if(String(node.riddleId) !== riddleId) throw new ValidationErrorModel("This riddle does not exists in the user node")
    const riddle = await RiddleModel.findById(riddleId).exec()
    if(!riddle) throw new ResourceNotFoundErrorModel(riddleId)
    const isCorrect = answer.trim().toLowerCase() === riddle.answer.toLowerCase()

    //עדכון מודל החידות-משתמש 
    await UserRiddleModel.findOneAndUpdate({userId, riddleId}, {
        userId,
        riddleId,
        isSolved: isCorrect,
        solvedAt: isCorrect? new Date() : null,    
    },{upsert: true, new: true})

    //החזרת הנקודות הבאות אליהן יכול המשתמש לגשת   
    const nextNodes = await MazeNodeModel.find({ _id: { $in: user.currentNode.nextNodes } }).exec()
    return isCorrect ? nextNodes : []
}

async function chooseNextNode(nextNodeId: string, userId: string): Promise<IRiddleModel> {
    //בדיקה מהו המיקום הנוכחי של המשתמש
    const user = await UserModel.findById(userId).populate("currentNode").exec()
    const nextNodes = user.currentNode.nextNodes

    //נבדוק האם קיים הצעד במסד הנתונים
    const node = await MazeNodeModel.findById(nextNodeId).exec()
    if(!node) throw new ResourceNotFoundErrorModel(nextNodeId)

    //נבדוק האם הצעד שנבחר אכן נמצא ברשימת הצעדים הבאים
    const bool = nextNodes.map(n => String(n)).includes(nextNodeId)
    if(!bool) throw new ValidationErrorModel("The user can not choose this node yet")
    
    //נעדכן את מודל המשתמש על המיקום החדש:
    await UserModel.findByIdAndUpdate(userId, {currentNode: nextNodeId})

    // נשלח חזרה ללקוח את חידה הקיימת בצעד הזה
    return RiddleModel.findById(node.riddleId).exec()
}

function fetchMaze(): Promise<IMazeNodeModel[]> {
    return MazeNodeModel.find().populate("riddles").populate({
        path: "nextNodesPopulated",
        populate: {
            path: "riddles"
        }
        }).exec()
    
}

function addMazeNode(mazeNode: IMazeNodeModel): Promise<IMazeNodeModel> {
    //validation
    const err = mazeNode.validateSync()
    if(err) throw new ValidationErrorModel(err.message)

    return mazeNode.save()
}

export default {
    fetchAllRiddles,
    checkAnswer,
    addRiddle,
    fetchMaze,
    addMazeNode,
    chooseNextNode
}