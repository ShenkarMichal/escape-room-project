
class AppConfig {

    public baseURL = "http://localhost:3001/api/"

    public riddlesURL = this.baseURL + "riddles/"

    public mazeURL = this.baseURL + "maze/"
    public nodeURL = this.mazeURL + "node/"
    public answerURL = this.mazeURL + "answer/"

    public registerURL = this.baseURL + "auth/register/"
    public loginURL = this.baseURL + "auth/login/"
}

const appConfig = new AppConfig()
export default appConfig