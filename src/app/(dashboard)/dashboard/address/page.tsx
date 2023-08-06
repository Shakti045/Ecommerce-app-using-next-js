'use client'
import { useEffect } from "react"
import axios from "axios"
import Loading from "@/app/loading"
import { useState } from "react"
import { toast } from "react-toastify"
import Addressform from "@/components/dashboard/AddressForm/Addressform"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import Address from "@/components/dashboard/AddressForm/Address"
const page = () => {
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState([])
  const [showform, setShowform] = useState(false);
  const {token}=useSelector((state:any)=>state.auth);
  async function getdata(){
    try{
      const result=await axios.get("/api/address",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(result.status===200){
        console.log(result.data.data);
        setAddress(result.data.data)
      }
    }catch(err:any){
      console.log("Error while fetching address","=>",err);
    }finally{
      setLoading(false)
    }
  }
  async function addaddress(data:any){
    const loadingtoast=toast.loading("Please wait......");
    try{
      const result=await axios.post("/api/address",data,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(result.status===200){
        await getdata();
        toast.success("Address Added Successfully");
      }
    }catch(err:any){
      console.log("Error while adding address","=>",err);
      toast.error("Error while adding address");
    }finally{
      toast.dismiss(loadingtoast);
    }
  }
  
  async function deleteaddress(id:any){
    const loadingtoast=toast.loading("Please wait......");
    try{
       const result=await axios.delete(`/api/address/deleteaddress/${id}`,{
         headers:{
          Authorization:`Bearer ${token}`
         }
       })

       if(result.status===200){
         await getdata();
         toast.success("Address deleted")
       }
    }catch(err){
      console.log("Error while deleting address","=>",err);
      toast.error("Error while deleting address");
    }finally{
      toast.dismiss(loadingtoast)
    }
  }
  
  async function makedefault(id:any) {
    const loadingtoast=toast.loading("Please wait......");
     try{
        const result=await axios.post("/api/address/makedefaultaddress",{addressid:id},{
          headers:{
            Authorization:`Bearer ${token}`
           }
        })
        if(result.status===200){
          await getdata();
          toast.success("Address markded as default")
        }
     }catch(err){
      console.log("Error while making default address","=>",err);
      toast.error("Error while making default address");
    }finally{
      toast.dismiss(loadingtoast)
    }
  }
  useEffect(()=>{
    getdata();
  },[])
  return (
    <div className=' flex flex-col  p-5 pb-0 w-full h-full  justify-center items-center  bg-white'>
       {
        loading?(<Loading/>):(<div className=" w-full h-full flex justify-center items-center">
          {
            (address.length===0 && !showform)?(<div className="   flex flex-col gap-2 items-center">
              <p className=" font-bold">You Have Not Added Any Address Yet</p>
              <button onClick={()=>setShowform(true)} className="bg-blue-600 text-white p-2 rounded-md">Add Address + </button>
            </div>):(<div className=" w-full h-full overflow-y-scroll addressform ">
               {
                  showform && (
                    <Addressform addaddress={addaddress} setshowform={setShowform}/>
                  )
                   
               }
               {
                !showform && (
                  <div className=" flex flex-col gap-4">
                     <h1 className=" font-bold text-lg">Manage Addresses</h1>
                     <button onClick={()=>setShowform(true)} className=" p-3 w-full border-[1px] border-slate-300 text-blue-600 text-start  font-bold">
                        + Add A New Address
                     </button>
                     <div className=" flex flex-col gap-3">
                       {
                        address.map((e:any,index:number)=>(
                          <Address makedefault={()=>makedefault(e._id)} deleteaddress={()=>deleteaddress(e._id)} key={index} data={e}/>
                        ))
                       }
                     </div>
                  </div>
                )
               }
            </div>)
          }
        </div>)
       }
   </div>
  )
}

export default page