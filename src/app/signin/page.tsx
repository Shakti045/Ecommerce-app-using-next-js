"use client"
import loginimage from "@/assets/images/flipkartlogin.jpg"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { GoogleLoginButton,GithubLoginButton } from "react-social-login-buttons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { set_user } from "@/redux/slices/user";
import { set_token } from "@/redux/slices/auth";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"


function Signin(){
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
   const dispatch:AppDispatch=useDispatch();
   const router=useRouter();
    async function submithandler(data:any) {
        const loadingtoast=toast.loading("Please wait....")
         try{
             const result=await axios.post("/api/login",{...data})
             if(result.status===200){
                toast.success("Login Success")
                dispatch(set_user(result.data.user));
                dispatch(set_token(result.data.token));
                router.push("/")
             }
         }catch(err:any){
            console.log("Error while login","=>",err);
            toast.error(err.response.data.Message);
         }finally{
            toast.dismiss(loadingtoast);
         }
         
    } 
    return (
        <div className=" w-full flex justify-center items-center mt-6 mb-6">
            <div className="  flex h-[80vh] w-[60vw]">
             <div className=" w-[35%] h-full flex flex-col justify-between  text-white bg-blue-700">
                 <div className=" flex flex-col gap-3 p-6">
                    <h1 className=" font-semibold text-3xl">LOGIN</h1>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                 </div>
                 <Image src={loginimage} alt="loginimage"/>
             </div>
             <div className=" w-[65%] flex flex-col gap-3 items-center p-6 bg-slate-200">
                 <form onSubmit={handleSubmit(submithandler)} className=" flex flex-col gap-3 w-[100%]">
                    <div className=" w-full">
                    <div className=" flex flex-col ">
                        <label>Email Id<sup className=" text-pink-700">*</sup></label>
                        <input className=" w-full bg-slate-300 p-2 rounded-md  outline-none" type="email" placeholder="Enter your emailid"
                    {...register("email",{required:{value:true,message:"Please enter your email id"}})}
                    ></input>
                    </div>
                    {
                        errors.email && (
                            <p className=" text-pink-600">Please enter your email id<sup>*</sup></p>
                        )
                    }
                    </div>
                   <div className=" w-full">
                   <div className=" flex flex-col">
                    <label>
                      Password<sup className=" text-pink-700">*</sup>
                    </label>
                    <input className=" w-full bg-slate-300 p-2 rounded-md  outline-none" type="password" placeholder="Enter your password"
                    {...register("password",{required:{value:true,message:"Please enter your password"}})}
                    ></input>
                   </div>
                    {
                        errors.password && (
                            <p className=" text-pink-600">Please enter your password<sup >*</sup></p>
                        )
                    }
                   </div>
                    <div className=" flex flex-col gap-1 w-full">
                    <button type="submit" className=" w-full bg-blue-600 text-lg  p-2 rounded-md text-white">Sign In</button>
                    <div className=" flex justify-between">
                    <Link className="" href="/">Back To Home Page</Link>
                    <Link className="" href="/resetpassword">Want to Reset Your Password</Link>
                    </div>
                    </div>
                 </form>
                 <GoogleLoginButton onClick={()=>signIn('google',{callbackUrl:"/signin/socialaccounts"})}/>
                 <GithubLoginButton onClick={()=>signIn('github',{callbackUrl:"/signin/socialaccounts"})}/>
                 <Link className=" text-blue-600" href="/signup">Do Not Have An Account ? Create A New</Link>
             </div>
        </div>
        </div>
    )
}

export default Signin;















