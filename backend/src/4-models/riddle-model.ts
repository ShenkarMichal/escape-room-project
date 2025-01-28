import mongoose from "mongoose";

//1 - interface
export interface IRiddleModel extends mongoose.Document{
    question: string
    answer: string

}

//2 - Schema
export const RiddleSchema = new mongoose.Schema<IRiddleModel>({
    question:{
        type: String,
        required: [true, "question is missing"]
    },
    answer:{
        type: String,
        required: [true, "answer is missing"]
    }

})

//3 - Model
export const RiddleModel = mongoose.model<IRiddleModel>("RiddleModel", RiddleSchema, "riddles")