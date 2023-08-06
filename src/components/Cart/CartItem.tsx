import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { toast } from 'react-toastify';
import Img from '../Common/Img';
import {BsCoin} from 'react-icons/bs'
import { remove_from_cart,add_to_cart, increase_quantity, decreasee_quantity } from '@/redux/slices/cart';
import { add_to_wishlist } from '@/redux/slices/wishlistitem';
import { increaserequantiy,decreaserequantiy,removeproduct } from '@/redux/slices/payment';
import Link from 'next/link';
const CratItem = ({product,requestfromorderpage}:{product:any,requestfromorderpage:boolean}) => {
  const dispatch:AppDispatch=useDispatch();
  
  const {discount,originalprice,sellprice,productname,productimage,_id,quantity,seller}=product;
 
 function removefromcart(){
   if(!requestfromorderpage){
    dispatch(remove_from_cart(_id));
    toast.success("Removed from cart")
   }else{
    dispatch(removeproduct(_id));
    toast.success("Removed from cart")
   }
 }
 
  function increasequantity(){
   if(!requestfromorderpage){
    dispatch(increase_quantity(_id));
    toast.dark(`${productname} added to cart`)
   }else{
    dispatch(increaserequantiy(_id));
    toast.dark(`${productname} added to buying list`)
   }
  }
  function decreasequantity(){
   if(!requestfromorderpage){
    dispatch(decreasee_quantity(_id));
    toast.dark(`${productname} removed from buying list`)
   }else{
    dispatch(decreaserequantiy(_id));
    toast.dark(`${productname} removed from buying list`)
   }
  }
  function addtowishlist(){
   if(!requestfromorderpage){
    dispatch(add_to_wishlist(product));
    dispatch(remove_from_cart(_id));
    toast.success("Added to wishlist")
   }else{
    dispatch(add_to_wishlist(product));
    dispatch(removeproduct(_id));
    toast.success("Added to wishlist")
   }
  }
  
  return (
    <div className=' border-b-[1px] border-slate-300 flex flex-col  gap-4 w-full p-4'>
       <Link href={`/product/${_id}`} className='  flex w-full justify-between'>
       <div  className={`  relative w-[150px]  h-[150px]`}> 
        <Img src={productimage} className={" absolute top-0 bottom-0 right-0 left-0 mx-auto my-auto max-w-[100%] max-h-[100%]  overflow-clip"}/>
        </div>
        <div className='  w-[400px] flex flex-col gap-2'>
          <h1 className=' text-lg font-semibold'>{productname.substring(0,80)}</h1>
          <h1 className=' font-light'>Seller: {seller?.businessname}</h1>
          <p className=' flex gap-2 items-center text-red-600'><BsCoin className=' text-yellow-600' size={20}/> You will earn {Math.floor((sellprice*quantity*2)/100)>200?200:Math.floor((sellprice*quantity*2)/100)} supercoins with this</p>
          <div className=' flex gap-2'>
            <h1 className=' text-lg font-semibold'>₹{sellprice}</h1>
            <h1 className=' text-lg font-semibold line-through text-gray-500'>₹{originalprice}</h1>
            <h1 className=' text-lg font-semibold text-green-500'>{discount}% off</h1>
            </div>
        </div>
        <div>
        Delivery in 2 days
        </div>
       </Link>
        <div className=' w-full flex gap-2'>
          <button onClick={decreasequantity} disabled={quantity===1} className='h-[25px] w-[50px] flex justify-center items-center rounded-full bg-slate-300'>-</button>
          <div className='  h-[25px] w-[50px] flex justify-center items-center bg-slate-300'>{quantity}</div>
          <button  onClick={increasequantity} className=' h-[25px] w-[50px] flex justify-center items-center rounded-full bg-slate-300'>+</button>
          <button onClick={addtowishlist} className=' ml-7  font-bold'>SAVE FOR LATER</button>
          <button onClick={removefromcart} className=' font-bold ml-4'>REMOVE</button>
          </div>
    </div>
  )
}

export default CratItem;