import { createSlice } from "@reduxjs/toolkit";
const initialState={
    wishlist: typeof window!=='undefined' &&  localStorage.getItem("ecommercewishlist")?JSON.parse(localStorage.getItem("ecommercewishlist")!):[]
}
export const wishlistitem=createSlice({
    name:"wishlistitem",
    initialState,
    reducers:{
        add_to_wishlist:(state,action)=>{
            const newwishlist=[...state.wishlist,action.payload]
            state.wishlist=newwishlist
            localStorage.setItem("ecommercewishlist",JSON.stringify(newwishlist))
        },
        remove_from_wishlist:(state,action)=>{
            const newwishlist=state.wishlist.filter((item:any)=>item._id!==action.payload)
            state.wishlist=newwishlist
            localStorage.setItem("ecommercewishlist",JSON.stringify(newwishlist))
        }
    }
})

export const {add_to_wishlist,remove_from_wishlist}=wishlistitem.actions;
export default wishlistitem.reducer;