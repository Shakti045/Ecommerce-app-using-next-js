"use client"
import { store } from "@/redux/store/store"
import { Provider } from "react-redux";
import { SessionProvider } from 'next-auth/react'
export const Providers=({children}:{children:React.ReactNode})=>{
    return (
     <SessionProvider>
        <Provider store={store}>
            {children}
        </Provider>
    </SessionProvider>
    )
}