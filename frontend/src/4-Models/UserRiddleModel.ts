
class UserRiddleModel {
    public _id: string
    public userId: string
    public riddleId: string
    public isSolved: boolean
    public solvedAt: Date | null
    public hintsUsed: number
}

export default UserRiddleModel