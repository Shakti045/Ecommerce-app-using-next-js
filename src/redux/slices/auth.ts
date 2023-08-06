"use client"
import { createSlice } from "@reduxjs/toolkit";
const initialState={
    
    token: typeof window!=='undefined' &&  localStorage.getItem("ecommercetoken")?JSON.parse(localStorage.getItem("ecommercetoken")!):null
}
export const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        set_token:(state,action)=>{
            state.token=action.payload
            localStorage.setItem("ecommercetoken",JSON.stringify(action.payload))
        }
    }
})

export const {set_token}=authslice.actions;
export default authslice.reducer;