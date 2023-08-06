'use client'
import { useSelector } from "react-redux"
import { useMemo } from "react";
import {AiFillSafetyCertificate} from "react-icons/ai"
import CartItem from "@/components/Cart/CartItem";
import emptycart from "@/assets/images/d438a32e-765a-4d8b-b4a6-520b560971e8.webp"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image"
import { set_products } from "@/redux/slices/payment";

const page = () => {
    const router=useRouter();
    const dispatch:AppDispatch=useDispatch();
    const {cart}=useSelector((state:any)=>state.cart);
    console.log(cart);

    function gettotal(){
      const total=cart.reduce((acc:any,item:any)=>{
        return acc+ parseInt(item.originalprice)*item.quantity
      } ,0)

      return total;
    }
    function getdiscount(){
      const total=cart.reduce((acc:any,item:any)=>{
        return acc+ (parseInt(item.originalprice)-parseInt(item.sellprice))*item.quantity
      } ,0)
      

      return total;
    }
    function getbuyingprice():number{
      const total=cart.reduce((acc:any,item:any)=>{
        return acc+ parseInt(item.sellprice)*item.quantity
      } ,0)
      return total;
    }
    function buynowhandler(){
      dispatch(set_products(cart));
      router.push('/payment?fromcart=true');
    }
    const total=useMemo(()=>gettotal(),[cart]);
    const discount=useMemo(()=>getdiscount(),[cart]);
    const buyingprice:number=useMemo(()=>{
      return getbuyingprice()
    },[cart]);
  return (
    <>
     {
      cart.length===0 ? (<div className=' bg-white w-full h-[calc(100vh-3.5rem)] flex flex-col gap-5 items-center justify-center  font-semibold'>
        <Image src={emptycart} alt="emptycart" width={300} height={300}/>
        <h1 className=" font-bold">Your cart is empty!</h1>
        <p className=" text-sm">Explore our wide selection and find something you like</p>
      </div>):(<>
        <div className=" h-[calc(100vh-3.5rem)] p-7 pb-0 flex gap-5">
        <div className="  h-full  w-[70%]">
        <div className=" cartcontainer rounded-md flex flex-col gap-2 overflow-y-scroll h-[85%] bg-white  w-full">
          {
             cart.map((item:any,index:number)=>{
               return <CartItem product={item} requestfromorderpage={false} key={index}/>
             })
          }
       </div>
       <div className="  flex justify-end  items-center h-[15%] bg-slate-800 w-full">
         <button onClick={buynowhandler} className=" h-fit  relative right-3  w-[40%] flex gap-2 items-center justify-center text-2xl text-white  bg-orange-500 py-3">Place Order</button>
       </div>
        </div>
       <div className=" flex flex-col  h-fit bg-white w-[30%] p-4 rounded-md shadow-md">
          <h1 className=" border-b-2 pb-4 opacity-80">PRICE DETAILS</h1>
            <div className=" mt-2 flex flex-col gap-2 w-full border-b-2 pb-2">
            <div className=" flex justify-between">
            <p>{`Price ( ${cart.length} item )`}</p>
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
   </div>
        </>)
     }
     </>
  )

}


export default page;