
class MazeNodeModel {
    public _id: string
    public riddleId: string
    public nextNodes: string[]

    public static riddleIdValidation: {
        required: {value: true, message: "Riddle is required"}
    }

    
}

export default MazeNodeModel