import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    paymentstep:1,
    products: [],
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        set_products: (state, action) => {
            state.products=action.payload
        },
        set_paymentstep: (state, action) => {
            state.paymentstep=action.payload
        },
        increaserequantiy:(state:any,action)=>{
            const index=state.products.findIndex((item:any)=>item._id===action.payload)
            state.products[index].quantity+=1
        },
        decreaserequantiy:(state:any,action)=>{
            const index=state.products.findIndex((item:any)=>item._id===action.payload)
            state.products[index].quantity-=1
        },
        removeproduct:(state:any,action)=>{
            const newproducts=state.products.filter((item:any)=>item._id!==action.payload)
            state.products=newproducts
        }


    }
})  

export const { set_products ,set_paymentstep,increaserequantiy,decreaserequantiy,removeproduct } = paymentSlice.actions;
export default paymentSlice.reducer;