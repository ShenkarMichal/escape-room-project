import { ResourceNotFoundErrorModel } from "../4-models/error-model";
import { IRiddleModel, RiddleModel } from "../4-models/riddle-model";
import { UserRiddleModel } from "../4-models/user-riddle-model";

function fetchAllRiddles(): Promise<IRiddleModel[]> {
    return RiddleModel.find().exec()    
}

async function checkAnswer(riddleId: string, userId: string, answer: string): Promise<boolean> {
    const riddle = await RiddleModel.findById(riddleId).exec()
    if(!riddle) throw new ResourceNotFoundErrorModel(riddleId)
    const isCorrect = answer.trim().toLowerCase() === riddle.answer.toLowerCase()

    await UserRiddleModel.findOneAndUpdate({userId, riddleId}, {
        userId,
        riddleId,
        isSolved: isCorrect,
        solvedAt: isCorrect? new Date() : null,    
    },{upsert: true, new: true})

    return isCorrect
}

export default {
    fetchAllRiddles,
    checkAnswer
}