"use client"
import axios from "axios";
import {useSession} from "next-auth/react"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { set_user } from "@/redux/slices/user";
import { set_token } from "@/redux/slices/auth";
import {useEffect} from "react"
const page = () => {
    const session:any=useSession();
    const dispatch:AppDispatch=useDispatch();
    const router=useRouter();
    async function getdata(){
        const loadingtoast=toast.loading("Please wait......")
        try{
            const result=await axios.get("/api/auth/nextauthlogin")
            if(result.status===200){
                toast.success("Login Success")
                dispatch(set_user(result.data.user))
                dispatch(set_token(result.data.token));
                router.push("/")
            }
        }catch(err:any){
            console.log("Error while login","=>",err);
            toast.error(err.response.data.Message); 
            router.push("/signin")
        }finally{
            toast.dismiss(loadingtoast)
        }
    }
    useEffect(()=>{
        if(session.status==="unauthenticated"){
            toast.error("Something went wrong")
            router.push("/signin")
            return;
        }
        getdata();
    },[])
  return (
    <div className=' flex justify-center items-center w-full h-[calc(100vh-3.5rem)]'>
      {
        session.status==="authenticated" && (
            <p>Signing you as {session?.data?.user?.email}......</p>
        )
      }
    </div>
  )
}

export default page