"use client"
import OtpInput from "react18-input-otp"
import {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { set_signupstep } from "@/redux/slices/signupsteps"
import axios from "axios";
import { toast } from "react-toastify"
const Verifyotp = ({getvalues,setValue}:{getvalues:any,setValue:any}) => {
    const dispatch:AppDispatch=useDispatch();
    const [otp, setOtp] = useState('');
    const [email,setemail]=useState('');
    const handleChange = (enteredOtp:string) => {
        setOtp(enteredOtp);
      };
      useEffect(()=>{
        console.log(getvalues());
        
        const {email}=getvalues();
        setemail(email)
      },[])
      async function handleresendotp() {
        const loadingtoast=toast.loading("Please wait.....")
         try{
        const result= await axios.post('/api/sendotp',{email:email})
        if(result.status===200){
            toast.success(`Otp sent to ${email}`)
         }
         }catch(err:any){
          console.log("Error while resending the otp","=>",err);
          toast.error(err.message);
          
         }finally{
            toast.dismiss(loadingtoast);
         }
      }
      async function  submithandler() {
        const loadingtoast=toast.loading("Please wait....")
         try{
           const result=await axios.post("/api/verifyotp",{email:email,otp:otp})
           console.log(result);
           if(result.status===200){
            toast.success("Mail verified succesfull")
            setValue("mailtoken",result.data.token);
            dispatch(set_signupstep(3));
           }
         }catch(err:any){
            console.log("Error while verifying the otp","=>",err);
            toast.error(err.response.data.Message);
            
         }finally{
          toast.dismiss(loadingtoast);
         }
      }
  return (

    <div className=" w-full flex flex-col gap-2 items-center">
    <p className=" mt-10">Enter the otp sent to {email}</p>
     <OtpInput autoComplete="on" containerStyle="flex text-4xl "
      inputStyle="bg-richblack-600 otpinput px-3 py-2 outline-yellow-50 rounded-lg"  ariaLabelOverride="true" isInputNum={true} value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />

      <button onClick={submithandler} className=" mt-7 p-2 bg-slate-300 text-blue-600  rounded-md  w-[60%]">Submit Otp</button>
      <div className=" w-[60%] flex justify-between">
         <button onClick={()=>dispatch(set_signupstep(1))}>Go Previous</button>
         <button onClick={handleresendotp}>Resend Otp</button>
       </div>
    </div>
  )
}

export default Verifyotp