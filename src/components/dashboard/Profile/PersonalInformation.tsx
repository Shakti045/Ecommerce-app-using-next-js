'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import { RootState } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateprofile } from "@/services/helperfunction";
const PersonalInformation = () => {
    const dispatch:AppDispatch=useDispatch();
    const {user}=useSelector((state:RootState)=>state.user);
    const {token}=useSelector((state:RootState)=>state.auth);
    const [editmode,seteditmode]=useState(false);
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();
    const [gender,setgender]=useState();
  
    function  genderhandler(e:any){
        if(editmode){
            setgender(e.target.value);
            setValue("gender",e.target.value);
        }
    }
     const  editprofile=async (data:any)=>{
        if(gender){
            data.gender=gender
        }
        updateprofile(data,toast,token,dispatch,seteditmode);
    }
    useEffect(()=>{
        setValue("firstname",user?.firstname);
        setValue("lastname",user?.lastname);3
        setgender(user?.gender);
    },[user])
  return (
    <div className="  flex flex-col gap-4">
      <div className=' flex gap-4'>
       <h1 className=' font-bold'>Personal Information</h1>
       {
              editmode?(<button onClick={()=>seteditmode(false)} className=' text-blue-700'>Cancel</button>):<button onClick={()=>seteditmode(true)} className=' text-blue-700'>Edit</button>
       }
      </div>
      <div className=' flex gap-4'>
      <div>
      <input readOnly={!editmode} type="text" className=' outline-none  p-2 border-2 border-gray-300 rounded-md' placeholder="First Name" 
         {
            ...register("firstname",{
                required:true
            })
        }
       />
        {
            errors.firstname && <p className=' text-red-500'>First Name is required</p>
        }

      </div>
        <div className=" flex flex-col ">
        <input  readOnly={!editmode} type="text" className=' outline-none  p-2 border-2 border-gray-300 rounded-md' placeholder="Laast Name"  {
            ...register("lastname",{
                required:true
            })
        } />
        {
            errors.lastname && <p className=' text-red-500'>Last Name is required</p>
        }
        </div>
        {
            editmode && (
                <button  onClick={handleSubmit(editprofile)} className=' h-fit bg-blue-700 text-white rounded-md p-2'>Save Changes</button>
            )
        }
      </div>
      <h1 className=' font-bold'>Your Gender</h1>
       <div className=" flex gap-3">
         <p>Male</p>
         <input  value="Male" onChange={genderhandler} type="radio" checked={gender==="Male"}/>
         <p>Female</p>
         <input  value="Female"  onChange={genderhandler} type="radio" checked={gender==="Female"}/>
       </div>
    </div>
  )
}

export default PersonalInformation