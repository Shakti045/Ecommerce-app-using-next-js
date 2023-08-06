'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateprofile } from '@/services/helperfunction'
import {toast} from 'react-toastify'
import Img from '@/components/Common/Img'
const ProfilePhoto = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user)
  const {token}=useSelector((state)=>state.auth);
  const [editmode,seteditmode]=React.useState(false)
  function handleuplaod(url){
     if(url){
       updateprofile({profilephoto:url},toast,token,dispatch,seteditmode);
     }
  }
  return (
   <div className=' flex flex-col gap-3'>
  <div className=' flex  gap-5'>
  <h1 className=' font-bold'>Profile Photo</h1>
       <CldUploadWidget onUpload={(result)=>{handleuplaod(result.info.secure_url)}} uploadPreset='rfahuwwl'>
          
          {({ open }) => {
            const onClick = () => {
              open();
            };
      
            return (
              <button 
                type="button" 
                
                variant="secondary" 
                onClick={onClick}
              >
               <p className=' text-blue-600'>Edit</p>
              </button>
            );
          }}
      
        </CldUploadWidget>
  </div>
  <div>
  <Img src={user?.profilephoto} alt='profile'   className=', h-[100px] w-[100px]'/>
  </div>
   </div>
  )
}

export default ProfilePhoto;