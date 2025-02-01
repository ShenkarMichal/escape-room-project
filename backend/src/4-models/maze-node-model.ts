import mongoose from "mongoose";
import { RiddleModel } from "./riddle-model";

// Interface
export interface IMazeNodeModel extends mongoose.Document {
    riddleId: mongoose.Schema.Types.ObjectId;
    nextNodes: mongoose.Schema.Types.ObjectId[];
}

// Schema
export const MazeNodeSchema = new mongoose.Schema<IMazeNodeModel>(
    {
        riddleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "riddle is required"]
        },
        nextNodes: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        }
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

// ✅ וירטואל של החידה
MazeNodeSchema.virtual("riddles", {
    ref: "RiddleModel", // ⬅️ שם המודל של החידות
    localField: "riddleId",
    foreignField: "_id",
    justOne: true
});

// ✅ וירטואל עבור ה-nextNodes
MazeNodeSchema.virtual("nextNodesPopulated", {
    ref: "MazeNodeModel", // ⬅️ חייב להיות זהה למה שיינתן ב-model()
    localField: "nextNodes",
    foreignField: "_id",
    justOne: false
});

// ✅ יצירת המודל רק אחרי שכל הווירטואליים הוגדרו
export const MazeNodeModel = mongoose.model("MazeNodeModel", MazeNodeSchema, "maze-node");
