import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";


const initialState={
    name:'',
    avatar:'/images/avatar-img.png',
}


const userSlice=createSlice({
    name:useReducer,
    initialState,
    reducers:{
        setUsername:(state,action)=>{
           const {name}=action.payload;
           state.name=name;
        },
        setAvatar:(state,action)=>{
            const {avatar}=action.payload;
            state.avatar=avatar;
        }
    }
});


export const {setUsername,setAvatar}=userSlice.actions;
export default userSlice.reducer;