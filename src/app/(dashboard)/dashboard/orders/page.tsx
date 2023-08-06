'use client'
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useEffect,useState } from "react"
import PaymentLoader from "@/components/payment/PaymentLoader"
import { toast } from "react-toastify"
import date from "date-and-time"
import Img from "@/components/Common/Img"
import Link from "next/link"
import {BsCurrencyRupee} from 'react-icons/bs'
import {RxCross2} from 'react-icons/rx'
import {AiFillStar} from 'react-icons/ai'

const page = () => {

  const {token}=useSelector((state:RootState)=>state.auth);
  const [loading,setloading]=useState<boolean>(true);
  const [orders,setorders]=useState<any>([]);
  async function getorders(){
    try{
      const res:any=await axios.get("/api/orders",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(res.status===200){
        console.log(res.data);
        setorders(res?.data?.Orders);
      }
    }catch(err){
      console.log("Error while fetching orders","=>",err);
      toast.error("Error while fetching orders");
    }finally{
      setloading(false);
    }
  }
  useEffect(()=>{
    getorders();
  },[])
  return (
    <div  className=' overflow-y-scroll supercoins rounded-md flex flex-col gap-4 p-5 w-full h-full bg-slate-200 '>
      {
        loading?<PaymentLoader/>:(
          <div  className=" flex   flex-col gap-5 w-full">
            
              
                {
                  orders.length===0?(<div className=" w-full h-full mt-[200px]  flex justify-center items-center flex-col">
                    <h1 className=" text-lg text-slate-400">You Have Not Purchased Anything Yet</h1>
                  </div>):(<>
                    {
                      orders.map((e:any,index:number)=>(
                        <>
                         {
                           e?.products.map((item:any,index:number)=>{
                             return <Link href={`/orders/${e._id}?productid=${item._id}`} key={index}  className="  p-5 rounded-md  bg-white w-full flex justify-between">
                              <div className=" relative w-[100px] h-[100px]">
                               <Img className={" absolute top-0 right-0 bottom-0 left-0 max-h-[100%] max-w-[100%] mx-auto my-auto overflow-clip"} src={item?.productimage} />
                              </div>
       
                              <div className=" text-slate-500 font-semibold w-[300px] flex flex-col gap-2">
                                 <h1 className=" text-sm">{item?.productname.substring(0,50)}</h1>
                                 <h1 className="  flex  items-center">{item?.quantity}  <RxCross2/>  <BsCurrencyRupee/>{item?.sellprice}</h1>
                              </div>
       
                              <div className=" w-[300px] text-slate-500 font-semibold flex flex-col gap-2">
                                 {
                                   item?.status==="Pending" && (
                                     <>
                                     
                                      <h1>Waiting for the seller to ship the product</h1>
                                       <h1>Order status: {"PENDING"}</h1>
                                       <h1>Order date: {date.format(new Date(item?.lastupdatedon), 'YYYY/MM/DD HH:MM')}</h1>
                                     </>
                                   )
                                 }
                                 {
                                   item?.status==="shipped" && (
                                     <>
                       
                                        <h1 className="  text-green-700">Waiting for the delivery of product</h1>
                                       <h1>Order status: {"SHIPPED"}</h1>
                                       <h1>Order date: {date.format(new Date(item?.lastupdatedon), 'YYYY/MM/DD HH:MM')}</h1>
                                     </>
                                   )
                                 }
                                 {
                                   item?.status==="delivered" && (
                                     <>
                   
                                       <h1>Order status: {"DELIVERED"}</h1>
                                       {/* <h1>Order date: {date.format(new Date(item?.lastupdatedon), 'YYYY/MM/DD HH:MM')}</h1> */}
                                       <h1>Delivered on : {date.format(new Date(item?.lastupdatedon), 'YYYY/MM/DD HH:MM')}</h1>
                                       <Link href={`/ratingreviews/${e._id}/?productid=${item._id}`} className=" flex gap-2 text-blue-600 items-center"><AiFillStar/> Rate & Review Product</Link>
                                     </>
                                   )
                                 }
                                 {
                                   item?.status==="cancelled" && (
                                     <>
                 
                                       <h1>Order status: {item?.status}</h1>
                                       <h1>Order date: {date.format(new Date(item?.lastupdatedon), 'YYYY/MM/DD HH:MM')}</h1>
                                     </>
                                   )
                                 }
       
                              </div>
                             </Link>
                           })
                         }
                        </>
                      ))  
                   }
                    </>)
                }
              
            
          </div>
        )
      }
    </div>
  )
}

export default page

