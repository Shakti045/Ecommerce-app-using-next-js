'use client'
import { createSlice } from '@reduxjs/toolkit'
const initialState={
    
    cart: typeof window!=='undefined' &&  localStorage.getItem("ecommercecart")?JSON.parse(localStorage.getItem("ecommercecart")!):[]
}
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        add_to_cart:(state,action)=>{
            const newcart=[...state.cart,action.payload]
            state.cart=newcart
            localStorage.setItem("ecommercecart",JSON.stringify(newcart))
        },
        remove_from_cart:(state,action)=>{
            const newcart=state.cart.filter((item:any)=>item._id!==action.payload)
            state.cart=newcart
            localStorage.setItem("ecommercecart",JSON.stringify(newcart))
        },
        increase_quantity:(state,action)=>{
            const index=state.cart.findIndex((item:any)=>item._id===action.payload)
            state.cart[index].quantity+=1
            localStorage.setItem("ecommercecart",JSON.stringify(state.cart))
        },
        decreasee_quantity:(state,action)=>{
            const index=state.cart.findIndex((item:any)=>item._id===action.payload)
            state.cart[index].quantity-=1
            localStorage.setItem("ecommercecart",JSON.stringify(state.cart))
        },
        reset_cart:(state)=>{
            state.cart=[]
            localStorage.setItem("ecommercecart",JSON.stringify([]))
        }
    }
})
export const {add_to_cart,remove_from_cart,increase_quantity,decreasee_quantity,reset_cart}=cartSlice.actions;
export default cartSlice.reducer;