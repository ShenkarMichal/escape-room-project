import cyber from "../2-utils/cyber";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model";
import RoleModel from "../4-models/role-model";
import { IUserModel, UserModel } from "../4-models/user-model";

function register(user:IUserModel): string {

    user.role = RoleModel.user

    //validate:
    const err = user.validateSync()
    if(err) throw new ValidationErrorModel(err.message)
    
    //hash password
    user.password = cyber.hash(user.password)
    //save the user to db
    user.save({validateBeforeSave: false})

    //generate token
    const token = cyber.getNewToken(user)
    return token    
}

async function login(credential: CredentialsModel): Promise<string> {
    //validate
    const err = credential.validate()
    if(err) throw new ValidationErrorModel(err)
    
    //hash password
    credential.password = cyber.hash(credential.password)

    //check with db if credential is valid
    const resoult = await UserModel.findOne({username: credential.username, password: credential.password}).exec()
    if(!resoult) throw new UnauthorizedErrorModel('username or ppassword is incorrect')
    const user = new UserModel(resoult)
    
    //generate token
    const token = cyber.getNewToken(user)
    return token
}

export default {
    register,
    login
}