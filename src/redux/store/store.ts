import { configureStore } from "@reduxjs/toolkit";
import { authslice } from "../slices/auth";
import { userslice } from "../slices/user";
import {signupstepslice} from "../slices/signupsteps";
import {cartSlice} from "../slices/cart";
import { wishlistitem } from "../slices/wishlistitem";
import { paymentSlice } from "../slices/payment";

export const store=configureStore({
  reducer:{
    auth:authslice.reducer,
    user:userslice.reducer,
    signupsteps:signupstepslice.reducer,
    cart:cartSlice.reducer,
    wishlistitem:wishlistitem.reducer,
    payment:paymentSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


