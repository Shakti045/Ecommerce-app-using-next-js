import axios from "axios";
import { set_user } from "@/redux/slices/user";
export const  updateprofile=async (data:any,toast:any,token:any,dispatch:any,seteditmode:any)=>{
    console.log(data);
    const loading=toast.loading("updating profile");
    try{
        const res=await axios.post("/api/user",{...data},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(res.status===200){
            toast.success("Profile updated successfully");
            dispatch(set_user(res.data.user));
            seteditmode(false);
        }
    }catch(err:any){
        console.log(err);
        toast.error(err.message);
    }finally{
        toast.dismiss(loading);
    }
}