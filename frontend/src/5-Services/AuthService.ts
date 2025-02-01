import axios from "axios";
import UserModel from "../4-Models/UserModel";
import appConfig from "../2-Utils/AppConfig";
import CredentialModel from "../4-Models/CredentialModel";
import { AppDispatch } from "../3-Redux/GlobalState";
import { logout, registerAndLogin } from "../3-Redux/authState";

class AuthService {

    public async register(user: UserModel, dispatch:AppDispatch): Promise<void> {

        const response = await axios.post<string>(appConfig.registerURL, user)
        const token = response.data

        dispatch(registerAndLogin(token))
    }

    public async login(credential: CredentialModel, dispatch:AppDispatch): Promise<void> {
        
        const response = await axios.post<string>(appConfig.loginURL, credential)
        const token = response.data

        dispatch(registerAndLogin(token))
    }

    public logout(dispatch: AppDispatch): void {
        dispatch(logout())
    }
}

const authService = new AuthService()
export default authService