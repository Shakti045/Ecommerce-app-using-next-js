import { createSlice } from "@reduxjs/toolkit";
const initialState={
    step:1
}
export const signupstepslice=createSlice({
    name:"signupsteps",
    initialState,
    reducers:{
        set_signupstep:(state,action)=>{
            state.step=action.payload
        }
    }
})

export const {set_signupstep}=signupstepslice.actions;
export default signupstepslice.reducer;