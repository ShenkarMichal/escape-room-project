import { jwtDecode } from "jwt-decode";
import UserModel from "../4-Models/UserModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Global State:
interface AuthState {
    user: UserModel
    token: string
}

//Initial State:
const initialState: AuthState = {
    user: null,
    token: null
}

if(sessionStorage.getItem("token")){
    initialState.token = sessionStorage.getItem("token")
    const container: {userObject: UserModel} = jwtDecode(initialState.token)
    initialState.user = container.userObject
}

//Slice:
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerAndLogin: ((state, action: PayloadAction<string>)=>{
            state.token = action.payload
            const container: {userObject:UserModel} = jwtDecode(state.token)
            state.user = container.userObject

            sessionStorage.setItem("token", action.payload)
        }),
        logout: ((state)=>{
            state.token = null
            state.user = null
            
            sessionStorage.removeItem("token")
        })
    }
})

//Export Actions:
export const {registerAndLogin, logout} = authSlice.actions

//Export reducer:
export default authSlice.reducer