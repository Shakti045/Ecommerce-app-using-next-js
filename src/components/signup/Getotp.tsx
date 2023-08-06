"use client"
import { useRouter } from "next/navigation"
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { set_signupstep } from "@/redux/slices/signupsteps";
const Getotp = ({register,getvalues}:{register:any,getvalues:any}) => {
    const router=useRouter();
    const dispatch:AppDispatch=useDispatch();
    async function handleotprequest() {
        const loadingtoast=toast.loading("Please wait....")
        try{
         const {email}=getvalues();
         const regex=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
         if(!regex.test(email)){
             return toast.error("Please enter correct mail id")
         }
         const result= await axios.post('/api/sendotp',{email:email})
        
         
         if(result.status===200){
            dispatch(set_signupstep(2))
         }
        }catch(err:any){
          console.log("Error while sendding otp","=>",err);
          toast.error(err.response.data.Message)
        }finally{
            toast.dismiss(loadingtoast);
        }
    }
  return (
    <div className=" w-full flex flex-col items-center gap-8">
    <div className=" flex flex-col mt-12 w-[90%] ">
   
    <label htmlFor="Email id" id="email">Email<sup className="text-pink-400">*</sup></label>
     <input className=" outline-none p-2 rounded-md bg-slate-300 w-full" placeholder="Enter your mail id" type="email" required id="email" {...register("email")}></input>
    </div>
    <div className=" flex flex-col gap-5 w-[90%]">
    <button  onClick={handleotprequest} className="  text-white p-2 rounded-md bg-orange-600 w-full">Request Otp</button>
    <button onClick={()=>router.push("/signin")} className="  text-blue-600 p-2 rounded-md bg-slate-300 w-full">Already Have An Account ? Login</button>
    </div>
    </div>
  )
}

export default Getotp