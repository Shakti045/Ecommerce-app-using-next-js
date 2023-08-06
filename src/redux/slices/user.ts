"use client"
import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user: typeof window!=='undefined' &&  localStorage.getItem("ecommerceuser")?JSON.parse(localStorage.getItem("ecommerceuser")!):null
}
export const userslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        set_user:(state,action)=>{
            state.user=action.payload
            localStorage.setItem("ecommerceuser",JSON.stringify(action.payload))
        }
    }
})

export const {set_user}=userslice.actions;
export default userslice.reducer;