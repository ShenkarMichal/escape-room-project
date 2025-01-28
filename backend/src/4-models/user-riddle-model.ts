import mongoose from "mongoose";
import { UserModel } from "./user-model";
import { RiddleModel } from "./riddle-model";

//interface
export interface IUserRiddleModel extends mongoose.Document{
    userId: mongoose.Schema.Types.ObjectId
    riddleId: mongoose.Schema.Types.ObjectId
    isSolved: boolean
    solvedAt: Date | null
    hintsUsed: number
}

//schema
export const UserRiddleSchema = new mongoose.Schema<IUserRiddleModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
    },
    riddleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "riddle is required"]
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    solvedAt: {
        type: Date,
        default: null
    },
    hintsUsed: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    toJSON: {virtuals: true},
    id: false
})

UserRiddleSchema.virtual("users", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
})
UserRiddleSchema.virtual("riddles", {
    ref: RiddleModel,
    localField: "riddleId",
    foreignField: "_id",
    justOne: true
})

//model
export const UserRiddleModel = mongoose.model<IUserRiddleModel>("UserRiddleModel", UserRiddleSchema, "user-riddle")