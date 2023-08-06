'use client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import PaymentLoader from './PaymentLoader'
import CratItem from '../Cart/CartItem'
import axios from 'axios'
import { toast } from 'react-toastify'
const FinalCheckout = ({supercoinsused,setsupercoinsused,buynowhandler}:   {supercoinsused:any,setsupercoinsused:any,buynowhandler:any}) => {
  const {paymentstep}=useSelector((state:RootState)=>state.payment);
  const {products}=useSelector((state:RootState)=>state.payment);
  const [loading,setloading]=useState<boolean>(true);
  const [supercoins,setsupercoins]=useState<number>(0);
  const {token}=useSelector((state:RootState)=>state.auth);
  const {user}=useSelector((state:RootState)=>state.user);
  
  async function getsupercoins(){
      try{
        const res:any = await axios.get("/api/user/getsupercoins",{
             headers:{
                   Authorization:`Bearer ${token}`
             }  
        })
        if(res.status === 200){
         console.log(res.data)
         setsupercoins(res.data.Data)
        }
     }catch(err:any){
      console.log("Error while fetching supercoins","=>",err);
    }finally{
      setloading(false);
    }
  }
  async function stripecheckouthandler(){
    const laoding=toast.loading("Please wait while we redirect you to stripe");
    try{
    const result:any=await axios.post("/api/payment/stripecheckout",{
      products:products,
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });                                                                         window.location = result.data.url                                      
    }catch(err){
      console.log("Error while redirecting to stripe","=>",err);
      toast.error("Error while redirecting to stripe");
    }finally{
      toast.dismiss(laoding);
    }
  }
  
  useEffect(()=>{
    getsupercoins();
  },[])
  return (
    <div className=' w-full '>
          {
            
          paymentstep===3?(
          <>
           {
            loading?(
            <>
            <div  className=' flex flex-col '>
              <div className=' w-full flex  gap-3 bg-blue-700 rounded t-md p-3'>
               <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>3</h1>
                 </div>
                <div>
                  <h1 className=' text-xl text-white font-bold '>ORDER SUMMARY</h1>
               </div>
            </div>
            <div className=' bg-white rounded-b-md w-full p-4'>
                <PaymentLoader/>
            </div>
            </div>
            </>):
            (
             <>
              <div  className=' flex flex-col '>
              <div className=' w-full flex  gap-3 bg-blue-700 rounded t-md p-3'>
               <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>3</h1>
                 </div>
                <div>
                  <h1 className=' text-xl text-white font-bold '>ORDER SUMMARY</h1>
               </div>
            </div>
            <div className=' w-full'>
              {
                products.length===0?(
                  <div className=' bg-white  rounded-b-md w-full p-4'>
                    <h1 className=' text-slate-400 text-xl text-center'>
                  No Products to make order
                </h1>
                  </div>
                ):(
                  <div className='  flex flex-col gap-4 w-full'>
                   <div className='  bg-white  rounded-b-md w-full p-4  flex flex-col gap-3'>
                   {
                  products.map((e:any,i:number)=>(
                    <CratItem requestfromorderpage={true} key={i} product={e}/>
                  ))
                   }
                   </div>
                   <div className=' flex flex-col gap-3  bg-white  rounded-md w-full p-4'>
                      <h1 className=' font-bold text-blue-700'>Your Supercoin Balance is {supercoins}</h1>
                      {
                        supercoins>0 && (
                          <div className=' flex gap-2'>
                            <input checked={supercoinsused} onChange={(e)=>setsupercoinsused(e.target.checked)} type='checkbox'/>
                            <h1 className=' font-bold text-pink-800 '>Use {supercoins} Supercoins to pay upto {supercoins}</h1>
                          </div>
                        )
                      }
                   </div>
                   <div className=' flex justify-between items-center  bg-white  rounded-md w-full p-4'>
                      <h1>Order confirmation will be sent to {user?.email}</h1>
                      <div className=' flex  gap-3'>
                      <button onClick={buynowhandler} className=' rounded-md w-fit p-2 bg-orange-600 text-white font-bold'>
                        CONTINUE TO PAYMENT
                      </button>
                      <button onClick={stripecheckouthandler} className='  rounded-md w-fit p-2 bg-blue-700  text-white font-bold'>
                        STRIPE CHECKOUT
                      </button>
                
                      </div>
                   </div>
                  </div>
                )
              }
            </div>
            </div>
            </>
            )
           }
          </>)
          :(<>
            <div className=' w-full flex  gap-3 bg-white rounded-md p-3'>
               <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>3</h1>
                 </div>
                <div>
                  <h1 className=' text-xl text-slate-300'>ORDER SUMMARY</h1>
               </div>
            </div>
          </>)
       }
              
            
         
    </div>
  )
}

export default FinalCheckout