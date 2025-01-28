
class AppConfig {

    public connectionString = "mongodb://localhost:27017/escape-room" //The data name

    public port = 3001
    public frontendURL = 'http://localhost:5173'
}

const appConfig = new AppConfig()
export default appConfig