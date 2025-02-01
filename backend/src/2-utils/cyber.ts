import { Request } from "express";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { IUserModel } from "../4-models/user-model";
import RoleModel from "../4-models/role-model";

const secretKey = "escape-room"

function getNewToken(user:IUserModel): string {

    const userObject = user.toObject()
    delete userObject.password

    const container = {userObject}
    const token = jwt.sign(container, secretKey, {expiresIn: '3h'})
    return token    
}

function verifyToken(request: Request):Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject)=>{
        try {
            const header = request.headers.authorization
            if(!header){
                resolve(false)
                return
            }
            const token = header.substring(7)
            if(!token){
                resolve(false)
                return
            }
            jwt.verify(token,secretKey, err =>{
                if(err){
                    resolve(false)
                    return
                }
                resolve(true)
            })
            
        } 
        catch (err: any) {
            reject(err)
        }
    })
}

async function verifyAdmin(request: Request): Promise<boolean>{
    const isLogged = await verifyToken(request)
    if(!isLogged) return false

    const header = request.headers.authorization
    const toekn = header.substring(7)

    const container: any = jwt.decode(toekn)
    console.log(container)
    const user: IUserModel = container.userObject

    return user.role === RoleModel.admin
}

const salt = "Lets solved it"
function hash(plainText: string): string {

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex")

    return hashText
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hash
}