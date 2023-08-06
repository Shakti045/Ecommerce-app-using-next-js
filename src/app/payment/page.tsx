'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {AiFillSafetyCertificate} from "react-icons/ai"
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {useEffect} from "react"
import { useMemo, useState } from "react";
import Image from "next/image"
import { set_paymentstep, set_products } from "@/redux/slices/payment"
import promotionbanner from "@/assets/images/promotion_banner_v2_active1.webp"
import LoginConfirmation from "@/components/payment/LoginConfirmation";
import AddressConfirmation from "@/components/payment/AddressConfirmation";
import FinalCheckout from "@/components/payment/FinalCheckout";
import { toast } from "react-toastify";

import { capturepayment } from "@/services/paymentservices";
const page = () => {
   const dispatch:AppDispatch=useDispatch();
   const router=useRouter();
    const {products}=useSelector((state:RootState)=>state.payment);
    const {token}=useSelector((state:RootState)=>state.auth);
    const {user}=useSelector((state:RootState)=>state.user);
    const [address,setaddress]=useState('');
    const [supercoinsused,setsupercoinsused]=useState(false);
    const [requestfromcart,setrequestfromcart]=useState(false);
    console.log(products);
    
    function gettotal(){
      const total=products.reduce((acc:any,item:any)=>{
        return acc+ parseInt(item.originalprice)*item.quantity
      } ,0)

      return total;
    }
    function getdiscount(){
      const total=products.reduce((acc:any,item:any)=>{
        return acc+ (parseInt(item.originalprice)-parseInt(item.sellprice))*item.quantity
      } ,0)
      

      return total;
    }
    function getbuyingprice():number{
      const total=products.reduce((acc:any,item:any)=>{
        return acc+ parseInt(item.sellprice)*item.quantity
      } ,0)
      return total;
    }
   
    function buynowhandler(){
      if(!products || !address || products?.length===0){
        return toast.error("Invalid request");
      }
      capturepayment(products,address,supercoinsused,token,user,router,requestfromcart,dispatch)
    }

    // async function stripecheckouthandler(){
    //   const laoding=toast.loading("Please wait while we redirect you to stripe");
    // try{
    // const result:any=await axios.post("/api/payment/stripecheckout",{
    //   products:products,
    //   address:address,
    //   supercoinsused:supercoinsused,
    //   token:token,
    //   user:user,
    //   requestfromcart:requestfromcart
    // },{
    //   headers:{
    //     Authorization:`Bearer ${token}`
    //   }
    // });                                                                         window.location = result.data.data.url                                      
    // }catch(err){
    //   console.log("Error while redirecting to stripe","=>",err);
    //   toast.error("Error while redirecting to stripe");
    // }finally{
    //   toast.dismiss(laoding);
    // }
    // }

    useEffect(()=>{
      dispatch(set_paymentstep(1));
     
      if(!token || !user || products.length===0){
        toast.error("Please add some products to cart");
        router.push("/");
      }
      
      
    },[])

    const fromcart=useSearchParams().get("fromcart")
    useEffect(()=>{
      console.log(fromcart);
      if(fromcart==="true"){
        console.log("from cart");
        setrequestfromcart(true);
      }
    },[fromcart])
    
    const total=useMemo(()=>gettotal(),[products]);
    const discount=useMemo(()=>getdiscount(),[products]);
    const buyingprice:number=useMemo(()=>{
      return getbuyingprice()
    },[products]);
  return (
    <>
     <div className=" h-[calc(100vh-3.5rem)] w-full p-7 pb-0 flex gap-5">
      <div className=" payment h-full overflow-y-scroll flex flex-col gap-3  rounded-md w-[70%] ">
         <LoginConfirmation token={token} user={user}/>
          <AddressConfirmation address={address} setaddress={setaddress}/>
          <FinalCheckout buynowhandler={buynowhandler} supercoinsused={supercoinsused} setsupercoinsused={setsupercoinsused}/>
      </div>

           <div className=" w-[30%] flex  h-full flex-col gap-10 ">
           <div className=" flex flex-col  h-fit bg-white w-full  p-4 rounded-md shadow-md">
         <h1 className=" border-b-2 pb-4 opacity-80">PRICE DETAILS</h1>
           <div className=" mt-2 flex flex-col gap-2 w-full border-b-2 pb-2">
           <div className=" flex justify-between">
           <p>{`Price ( ${products.length} item )`}</p>
            <p>₹{total}</p>
         </div>
         <div className=" flex justify-between">
           <p>Discount</p>
            <p className=" text-green-500">-₹{discount}</p>
         </div>
         <div className=" flex justify-between">
           <p>Delivery Charges</p>
            <p className=" text-green-500">Free</p>
         </div>
           </div>
           <div className=" border-b-2 pb-2  mt-2 flex justify-between">
            <p>Total Amount</p>
            <p className="  text-lg font-bold">₹{buyingprice}</p>
           </div>
           <p className=" mt-3 text-green-600">You will save ₹{discount} on this order</p>
           <div className=" mt-4  gap-3 flex items-center">
            <AiFillSafetyCertificate size={25}/>
            <p className=" text-xs text-gray-500">Safe and Secure Payments.Easy returns.100% Authentic products</p>
           </div>
          </div>
          <div className="">
         <Image className="  w-[full]" alt="promotion bannwer" src={promotionbanner} />
          </div>
           </div>
     </div>
    </>
  )
}

export default page


