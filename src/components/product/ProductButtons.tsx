'use client'
import React from 'react'
import {BsFillLightningChargeFill} from "react-icons/bs"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { useSelector } from 'react-redux';
import {toast} from "react-toastify"
import { add_to_cart } from '@/redux/slices/cart';
import { useRouter } from 'next/navigation';
import { set_products } from '@/redux/slices/payment';
const ProductButtons = ({_id,cartitem,numberofproducts}:{_id:number,cartitem:any,numberofproducts:number}) => {
  const dispatch:AppDispatch=useDispatch();
  const {token}=useSelector((state:any)=>state.auth);
  const {cart}=useSelector((state:any)=>state.cart);
  const router=useRouter();
  async function addtocart(){
    if(!token){
      return toast.dark("Please login to add in cart")
    }
    dispatch(add_to_cart(cartitem));
    toast.success("Added to cart")
  }
  async function buynow(){
     if(!token){
       return toast.dark("Please login to buy products")
     }
     dispatch(set_products([cartitem]));
     router.push('/payment');
  }
  return (
      <>
       {
          numberofproducts>0 ? (
            <div className=' w-full ml-[20%] flex gap-2  pb-2 h-[15%] pt-2'>
            {
               cart.find((item:any)=>item._id===_id) ? (<button onClick={()=>{router.push('/cart')}} className=' h-fit w-[40%] flex gap-2 items-center justify-center text-lg text-white font-semibold bg-orange-700 rounded-md p-3'><AiOutlineShoppingCart/> GO TO CART</button>):<button onClick={addtocart} className=' h-fit w-[40%] flex gap-2 items-center justify-center text-lg text-white font-semibold bg-orange-700 rounded-md p-3'><AiOutlineShoppingCart/> ADD TO CART</button>
            }
                <button onClick={buynow} className=' h-fit  w-[40%] flex gap-2 items-center justify-center text-lg text-white font-semibold bg-red-600 rounded-md p-3'><BsFillLightningChargeFill/> BUY NOW</button>
              </div>
          ):(<p className=' mt-2 ml-[35%] text-red-600 font-bold text-xl'>Currently Outof Stock</p>)
       }
      </>
  )
}

export default ProductButtons