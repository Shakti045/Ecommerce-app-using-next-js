"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { set_signupstep } from "@/redux/slices/signupsteps"
const Createaccount = ({register,handlesubmit}:{register:any,handlesubmit:any}) => {
  const router=useRouter();
  const dispatch:AppDispatch=useDispatch();
  async function submithandler(data:any) {
    
     const loadingtpast=toast.loading("Please wait.....")
     try{
       const result=await axios.post("/api/signup",{...data})
       console.log(result);
       
       if(result.status===200){
        toast.success("Account created successfully")
         dispatch(set_signupstep(1))
        router.push("/signin");
       }
     }catch(err:any){
       console.log("Error while creating account","=>",err);
       toast.error(err.response.data.Message); 
     }finally{
      toast.dismiss(loadingtpast);
     }
     
  }
  return (
    <div className=" w-full flex flex-col items-center">
         <div className=" flex flex-col items-center">
      </div>
      <form onSubmit={handlesubmit(submithandler)} className=" mt-3 w-[90%] flex flex-col gap-4 ">
      <div className=" flex flex-col w-full ">
        <label htmlFor="firstname">First Name<sup className=" text-pink-600 ">*</sup></label>
        <input placeholder="Enter your First Name" className=" w-full p-2 bg-slate-300 outline-none rounded-md" type="text" id="firstname" {...register("firstname")} ></input>
      </div>
      <div className=" flex flex-col ">
        <label htmlFor="lastname">last Name<sup className=" text-pink-600 ">*</sup></label>
        <input placeholder="Enter Your Last Name" className=" w-full p-2 bg-slate-300 outline-none rounded-md" type="text" id="lastname" {...register("lastname")} ></input>
      </div>
      <div className=" flex flex-col ">
        <label htmlFor="lastname">Create password<sup className=" text-pink-600 ">*</sup></label>
        <input placeholder="Create a new password"  className=" w-full p-2 bg-slate-300 outline-none rounded-md" type="password" id="password" {...register("password")} ></input>
      </div>
      <button type="submit" className=" p-2 bg-orange-600 text-white font-bold rounded-md">Create Account</button>
      </form>
    </div>
  )
}

export default Createaccount