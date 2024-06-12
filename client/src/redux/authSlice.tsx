import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginData, registerData } from "../models/Types";

interface userState {
    user: loginData | registerData| null
}

const initialState: userState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: (state, action:PayloadAction<loginData>) =>{
            state.user = action.payload
        },
        logout: (state) =>{
            state.user = null
        },
        addXp: (state, action:PayloadAction<number>) => {
            state.user.experience_points += action.payload
        }
    }
})

export const {login , logout ,addXp} = authSlice.actions

export default authSlice.reducer