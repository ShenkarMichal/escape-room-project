import { configureStore } from "@reduxjs/toolkit";
import authReucer from "./authState"

//Create Store:
const globalStore = configureStore({
    reducer:{
        auth: authReucer
    }
})

//Export Types:
export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch

//Export Store:
export default globalStore