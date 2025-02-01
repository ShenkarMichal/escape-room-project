import axios from "axios";
import RiddleModel from "../4-Models/RiddleModel";
import appConfig from "../2-Utils/AppConfig";
import MazeNodeModel from "../4-Models/MazeNodeModel";

class RiddleService {

    public async fetchRiddles(): Promise<RiddleModel[]> {

        const response = await axios.get<RiddleModel[]>(appConfig.riddlesURL)
        const riddles = response.data

        return riddles
    }

    public async addNewRiddle(riddle: RiddleModel): Promise<RiddleModel> {
        
        const response = await axios.post<RiddleModel>(appConfig.riddlesURL, riddle)
        const newRiddle = response.data

        return newRiddle
    }

    public async checkAnswer(riddleId: string, userId: string, answer: string): Promise<MazeNodeModel[]> {

        const response = await axios.post<MazeNodeModel[]>(appConfig.answerURL + riddleId + "/" + userId, {answer: answer})
        const nextNodes = response.data

        return nextNodes
    }

    public async chooseNextNode(nextNodeId: string, userId: string): Promise<RiddleModel> {

        const response = await axios.get<RiddleModel>(appConfig.nodeURL + nextNodeId + "/" + userId)
        const riddle = response.data

        return riddle
    }

    public async fetchMaze(): Promise<MazeNodeModel[]> {

        const response = await axios.get<MazeNodeModel[]>(appConfig.mazeURL)
        const maze = response.data

        return maze
    }

    public async addNewMazeNode(node: MazeNodeModel): Promise<MazeNodeModel> {

        const response = await axios.post<MazeNodeModel>(appConfig.nodeURL, node)
        const newNode = response.data

        return newNode
    }

}

const riddleService = new RiddleService()
export default riddleService