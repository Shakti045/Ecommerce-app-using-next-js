'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import { RootState } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateprofile } from "@/services/helperfunction";
const Email = () => {
    const dispatch:AppDispatch=useDispatch();
    const {user}=useSelector((state:RootState)=>state.user);
    const {token}=useSelector((state:RootState)=>state.auth);
    const [editmode,seteditmode]=useState(false);
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();

  
     const  editprofile=async (data:any)=>{
        
        updateprofile(data,toast,token,dispatch,seteditmode);
    }
    useEffect(()=>{
        setValue("email",user?.email);
    },[user])
  return (
    <div className=" mt-9  flex flex-col gap-4">
      <div className=' flex gap-4'>
       <h1 className=' font-bold'>Email</h1>
       {
              editmode?(<button onClick={()=>seteditmode(false)} className=' text-blue-700'>Cancel</button>):<button onClick={()=>seteditmode(true)} className=' text-blue-700'>Edit</button>
       }
      </div>
      <div className=' flex gap-4'>
      <div>
      <input readOnly={!editmode} type="text" className=' w-[300px] outline-none  p-2 border-2 border-gray-300 rounded-md' placeholder="Email" 
         {
            ...register("email",{
                required:true
            })
        }
       />
        {
            errors.email && <p className=' text-red-500'>Email is required</p>
        }

     
        </div>
        <div>
    {
        editmode && <button onClick={handleSubmit(editprofile)} className=' bg-blue-700 text-white p-2 rounded-md'>Save</button>
    }
    </div>
    </div>
    
    </div>
    );

}

export default Email;