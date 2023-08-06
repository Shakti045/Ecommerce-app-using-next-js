"use client"
import React from 'react'
import Loading from '@/app/loading'
import { toast } from 'react-toastify';
import axios from 'axios';
import Profile from '@/components/profile/profile';
const page = () => {
    const loadingtoast=toast.loading("Loading Profile....")
    const [loading,setLoading]=React.useState(true);
    const [data,setData]=React.useState('')
    async function getprofile(){
        try{
            const res=await axios.get("/api/profile/getprofile")
            if(res.status===200){
                toast.success("Profile Loaded")
            }
        }catch(err:any){
            console.log(err);
            toast.error(err.message);
    }finally{
        toast.dismiss(loadingtoast);
        setLoading(false);
    }
    }
  return (
    <div> {
           loading?<Loading/>:<Profile data={data}/>
        }</div>
  )
}

export default page