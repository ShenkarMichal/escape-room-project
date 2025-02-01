import mongoose from "mongoose";
import RoleModel from "./role-model";
import { IMazeNodeModel, MazeNodeModel } from "./maze-node-model";

//1 - interface
export interface IUserModel extends mongoose.Document{
    name: string
    username: string
    password: string
    currentNode: IMazeNodeModel
    role: RoleModel
}

//2 - Schema
export const UserSchema = new mongoose.Schema<IUserModel>({
    name:{
        type: String,
        required: [true, "Name is missing"],
        minlength: [2, "Name is too short"],
        maxlength: [20, "Name is too long"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is missing"],
        minlength: [2, "Username is too short"],
        maxlength: [20, "Username is too long"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is missing"],
        minlength: [8, "Password is too short"],
        maxlength: [8, "Password is too long"]
    },
    currentNode:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MazeNodeModel",
        default: null
    },
    role: {
        type: String,
        required: [true, 'Role is missing']
    }
},{
    versionKey: false,
    toJSON: {virtuals: true},
    id: false
})

UserSchema.virtual("maze-node", {
    ref: MazeNodeModel,
    localField: "currentNode",
    foreignField: "_id",
    justOne: true
})

//3 - Model
export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, "users")