"use client"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form";
import signupimage from "@/assets/images/signup.jpg"
import Rendersignupsteps from "@/components/signup/Rendersignupsteps";
const page = () => {
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
    async function submithandler() {
        
    }
  return (
    <div className=" w-full flex justify-center items-center mt-6 mb-6">
          <div className=" h-[80vh] w-[60vw] shadow-lg  flex">
          <div className=" w-[35%] text-white flex flex-col justify-between  bg-blue-600 p-2 rounded-l-md ">
              <div className="p-4 flex flex-col gap-3">
                <h1 className="text-2xl font-bold">SIGNUP</h1>
                <p>Looks like you are new here</p>
                <p>Sign up with your mail id to get started</p>
                </div>
                <Image className=" h-[200px]" src={signupimage} alt="signupimage"/>
               </div>
             
           <div className=" bg-slate-200  p-2 rounded-r-md  flex flex-col gap-6 items-center w-[65%]">
               <Rendersignupsteps/>

            </div>
         </div>
           
    </div>
      
)
  
}

export default page;