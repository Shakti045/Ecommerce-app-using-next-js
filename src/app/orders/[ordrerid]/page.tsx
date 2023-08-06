'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '@/components/Common/Loader'
import supercoin from "@/assets/images/super_coin_icon_22X22.webp"
import Image from 'next/image'
import {BiSolidOffer} from "react-icons/bi"
import Img from '@/components/Common/Img'
import Progressbar from '@/components/Orders/Progressbar'
import Link from 'next/link'
const page = () => {
  const productid=useSearchParams().get("productid");
  const pathname=usePathname();
  const orderid=pathname.split("/")[2];
  const [loading,setloading]=React.useState(true);
  const {token}=useSelector((state:any)=>state.auth);
  const [data,setdata]=React.useState<any>(null);
  const [productindex,setproductindex]=React.useState(0);
 async function getorder(){
    try{
      const res=await axios.get(`/api/orders/${orderid}`,{
        headers:{
          Authorization:`Bearer ${token}`
                }
      });

      if(res.status===200){
        console.log(res.data);
        setdata(res.data.Order);
        setproductindex(res.data.Order.products.findIndex((e:any)=>e._id===productid));
      }

    }catch(err){
      console.log("Error while fetching order","=>",err);
      toast.error("Error while fetching order");
    }finally{
      setloading(false);
    }
  }

  async function cancelhandler(){
    const loadingtoast=toast.loading("Please wait while we cancel your order.....");
    try{
      const res=await axios.put(`/api/orders/${orderid}`,{productid:productid},{
        headers:{
          Authorization:`Bearer ${token}`
                }
      });
      if(res.status===200){
        toast.success("Order cancelled successfully");
        getorder();
      }
    }catch(err){
      console.log("Error while cancelling order","=>",err);
      toast.error("Error while cancelling order");
    }finally{
      toast.dismiss(loadingtoast);
    }

  }
  React.useEffect(()=>{
    getorder();
  },[orderid,productid])
  return (
    <div className=' h-fit flex flex-col gap-5 justify-center items-center   p-10    min-h-[calc(100vh-3.5rem)]'>
      {
        loading?<Loader/>:(
          <>
           <div className='  w-full text-sm p-10 pb-2 rounded-md bg-white flex justify-between '>
              <div className=' p-3 w-[40%] flex flex-col gap-2'>
               <h1 className=' text-lg font-bold'>Delivery Address</h1>
               <h1 className=' text-lg font-bold'>{data?.deliveryaddress?.fullname}</h1>
               <h1 className=' text-slate-400'>
                {data?.deliveryaddress?.customaddress}
               </h1>
               <h1 className=' text-slate-400'>
                {data?.deliveryaddress?.district} {data?.deliveryaddress?.state} {data?.deliveryaddress?.pincode}
               </h1>
               <h1 className=' flex gap-2'>Phone Number : <h1 className=' text-slate-400'>{data?.deliveryaddress?.mobilenumber}</h1></h1>
              </div>
                {
                 data?.products[productindex].status==="cancelled"?(<div>
                    {/* <h1 className=' text-lg font-bold'>Order Cancelled</h1> */}
                 </div>):(<>
                    <div className=' p-3 text-slate-400 flex flex-col gap-2 text-sm w-[30%] border-x-[1px]  items-center   justify-center '>
                      <div className=' flex flex-col gap-2  font-bold text-black'>
                      <h1 className=' font-bold text-lg'>Your Rewards</h1>
                     <div className=' flex items-center gap-2 '>

                      <div className=' p-2 bg-slate-200  rounded-full flex items-center'>
                      <Image height={20} width={20} src={supercoin} alt="supercoin"></Image>
                      </div>
                      <div className=' flex flex-col'>
                      <h1 > {data?.products[productindex].supercoinsearned} SuperCoins Cashback</h1>
                      <h1>
                        {
                          data?.products[productindex].status!=="delivered"?`Waiting to be credited`:"Use it to save on your next order"
                        }
                      </h1>
                      </div>
                     </div>  
                     <div className=' flex items-center gap-2 '>
                        
                        <div className='  p-2 bg-slate-200  rounded-full flex items-center'>
                        <Image height={20} width={20} src={supercoin} alt="supercoin"></Image>
                        </div>
                        <div className=' flex flex-col'>
                        <h1 > {data?.products[productindex].supercoinsused} SuperCoins Used</h1>
                        <h1>{data?.products[productindex].supercoinsused} saved using supercoins</h1>
                        </div>
                     </div>  
                     <div className=' flex items-center gap-2 '>
                      <div className=' p-2 bg-slate-200  rounded-md '>
                        <BiSolidOffer size={20} color="#ff9f00"/>
                      </div>
                      <div className=' flex flex-col'>
                      <h1 > {1} Offers Applied</h1>
                      <h1>Got ₹{data?.products[productindex].originalprice - data?.products[productindex].sellprice} off</h1>
                      </div>
                     </div>
                      </div>
                 </div>



                 
                  </>)
                }
              <div className=' p-3 w-[40%] flex flex-col gap-2'>
               <h1 className=' text-lg font-bold'>More actions</h1>
               <h1 className=' flex gap-3'>Order id <span>{data._id.toUpperCase()}</span></h1>
               <h1 className=' flex gap-3 items-center'>Download Invoice  <Link 
                href={`/orders/getinvoice?orderid=${data._id.toUpperCase()}`} className=' px-4 py-1 border-[1px] border-slate-300 text-blue-600'>Download</Link></h1>
              </div>
              </div>
           <div className=' w-full p-10  rounded-md bg-white flex justify-between'>
             <div className=' flex  gap-5 items-center'>
             <div className=' h-[150px] w-[150px] relative'>
             <Img src={data?.products[productindex]?.productimage} className={ " absolute top-0 bottom-0 right-0 left-0 max-h-full max-w-full mx-auto my-auto overflow-clip"}/>
            </div>
            <div className=' flex flex-col gap-2'>
              <h1 className='  font-bold'>{data?.products[productindex]?.productname.substring(0,50)}</h1>
              <h1 className=' text-slate-400'>Seller : {data?.products[productindex]?.seller?.businessname}</h1>
              <h1 className=' text-slate-400'>Price : ₹{data?.products[productindex]?.sellprice}</h1>
            </div>
             </div>
              <div className ="flex flex-col items-center gap-2">
                  <Progressbar cancelhandler={()=>cancelhandler()} lastupdated={data?.products[productindex]?.
                    lastupdatedon} createdon={data?.createdAt} status={data?.products[productindex]?.status.toUpperCase()} />
              </div>
           </div>

            <div className=' w-full p-10  rounded-md bg-white flex flex-col gap-3 '>
              <h1 className=' font-bold'>Other items in this order</h1>
             <div className='  gap-4 grid grid-col-2 '>
             {
                  data?.products.map((e:any,i:number)=>{
                    if(i!==productindex){
                    
                    
                    return (
                      <div className=' flex  gap-5 items-center'>
                      <div className=' h-[150px] w-[150px] relative'>
                      <Img src={e?.productimage} className={ " absolute top-0 bottom-0 right-0 left-0 max-h-full max-w-full mx-auto my-auto overflow-clip"}/>
                     </div>
                     <div className=' flex flex-col gap-2'>
                       <h1 className='  font-bold'>{e?.productname.substring(0,50)}</h1>
                       <h1 className=' text-slate-400'>Seller : {e?.seller?.businessname}</h1>
                       <h1 className=' text-slate-400'>Price : ₹{e?.sellprice}</h1>
                     </div>
                      </div>
                    )
                  }
                  })
               }
             </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default page