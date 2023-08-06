'use client'
import React, { useEffect, useState } from 'react'
import PaymentLoader from './PaymentLoader'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import {TiTick} from "react-icons/ti"
import { set_paymentstep } from '@/redux/slices/payment'
import Addressform from '../dashboard/AddressForm/Addressform'
import { toast } from 'react-toastify'
const AddressConfirmation = ({address,setaddress}:{address:any,setaddress:any}) => {
  const [loading,setloading]=React.useState<boolean>(true);
  const [addresses,setaddresses]=React.useState<any>([]);
  const {token}=useSelector((state:any)=>state.auth);
  const {paymentstep}=useSelector((state:RootState)=>state.payment);
  const [currentchecked,setcurrentchecked]=useState<any>('');
  const [showform,setshowform]=useState<boolean>(false);
  const dispatch:AppDispatch=useDispatch();
  async function getaddresses(){
    try{
      const result=await axios.get("/api/address",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(result.status===200){
        console.log(result.data.data);
        result.data.data.forEach((e:any)=>{
          if(e.defaultaddress){
            setcurrentchecked(e._id)
            }
          })
    
        setaddresses(result.data.data)
      }
    }catch(err:any){
      console.log("Error while fetching address","=>",err);
  }
  finally{
    setloading(false)
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
      await getaddresses();
      toast.success("Address Added Successfully");
    }
  }catch(err:any){
    console.log("Error while adding address","=>",err);
    toast.error("Error while adding address");
  }finally{
    toast.dismiss(loadingtoast);
  }
}
useEffect(()=>{
  getaddresses();
},[]);
  return (
    <>
      {
        paymentstep===2?
        (
          <div className=' w-full '>
          {
             loading?<div className=' w-full bg-white p-4 rounded-md'>
                 <PaymentLoader/>
             </div>:(
               <>
                {
                 addresses.length===0?(
               
                 <div className='  w-full flex flex-col '>
                  <div className=' rounded-t-md flex gap-3 w-full p-3 bg-blue-700'>
                  <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>2</h1>
                 </div>
                 <h1 className= ' text-white  font-bold text-lg'>DELIVERY ADDRESS</h1>
                 </div>
                    {
                      showform?(<Addressform setshowform={setshowform} 
                      addaddress={addaddress}/>):(
                        <div className=' bg-white flex flex-col justify-center items-center gap-3 p-3 rounded-md'>
                        <h1 className=' text-center text-2xl font-bold'>No Address Found</h1>
                        <button onClick={()=>setshowform(true)} className=' bg-blue-600 w-fit text-white p-2 rounded-md'>Add Address +</button>
                     </div>
                      )
                    }
                </div>
                 
                 ):(
                   <div className='  w-full flex flex-col '>
                    
                     <div className=' rounded-t-md flex gap-3 w-full p-3 bg-blue-700'>
                     <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                     <h1 className=' text-blue-700'>2</h1>
                    </div>
                    <h1 className= ' text-white  font-bold text-lg'>DELIVERY ADDRESS</h1>
                     </div>
                     {
                        showform && <Addressform setshowform={setshowform} addaddress={addaddress}/>
                     }
                   <div className=' bg-white rounded-b-md  py-3 w-full flex flex-col gap-5'>
                     {
                       addresses.map((e:any)=>(
                          <div key={e._id} className={`  p-3 flex flex-col gap-3 ${currentchecked===e._id &&  " bg-slate-100"}`}>
                           <div  className=' flex gap-2 items-start'>
                           <input name='address' onChange={(e)=>setcurrentchecked(e.target.value)} value={e._id}  
                            checked={currentchecked===e._id}  className='  relative top-[5px]' type='radio'/>
                           <div className=' flex flex-col '>
                            <h1>{e?.fullname} {e?.mobilenumber}</h1>
                            <h1>{e?.locality}</h1>
                            <h1>{e?.district}  {e?.state} {e?.pincode}</h1>
                           </div>
                         </div>
                           {
                              currentchecked===e._id&&<button onClick={()=>{
                                setaddress(e);
                                dispatch(set_paymentstep(3))
                              }} className=' w-fit bg-orange-600 p-2 px-5  text-white mx-7  font-semibold '>DELIVER HERE</button>
                           }
                          </div>
                       ))
                     }
                     <button>
                      <button onClick={()=>setshowform(true)} className='  text-blue-700  p-2 rounded-md'>Add A New Address +</button>
                    </button>
                   </div>
                    
                   </div>


                 )
                }
               </>
             )
          }
       </div>
        ):
        (
          <div className=' w-full flex flex-col  bg-white p-3 rounded-md'>
          <div className=' w-full flex justify-between'>
             <div  className=' flex gap-3 '>
                 <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>2</h1>
                 </div>
                 <h1 className=' text-slate-300 text-lg'>DELIVERY ADDRESS</h1>
                 {
                  address && <TiTick size={20} className=' text-green-500'/>
                 }
                 </div>
                 <div>
                  {
                    address && <button onClick={()=>dispatch(set_paymentstep(2))}  className=' p-2 px-5 text-blue-600  font-semibold border-[1px] border-slate-300'>CHANGE</button>
                  }
                  </div>
                 
          </div>
          <div>
                    {
                      address && (
                        <div className=' mx-8'>
                          <h1 className=' font-semibold text-lg'>{address?.fullname} {address?.mobilenumber}</h1>
                          <h1>{address?.locality}</h1>
                          <h1>{address?.district}  {address?.state} {address?.pincode}</h1>
                        </div>
                      )
                    }
                  </div>
          </div>
        )
      }
    </>
  )
}

export default AddressConfirmation