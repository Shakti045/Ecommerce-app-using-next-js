'use client'
import React from 'react'
import Img from '../Common/Img'
import {useState} from 'react'
import { FcLike,FcLikePlaceholder } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { add_to_wishlist, remove_from_wishlist } from '@/redux/slices/wishlistitem'
import { toast } from 'react-toastify'
const Productimages = ({productimages,productid,wishlistitem}:{productimages:string [],productid:number,wishlistitem:any}) => {
    const [currindex,setcurrindex]=useState(0);
    const {wishlist}=useSelector((state:RootState)=>state.wishlistitem);
    const dispatch:AppDispatch=useDispatch();
    function addtowishlist(){
      dispatch(add_to_wishlist(wishlistitem));
      toast.dark("Added to wishlist")
    }
    function removefromwishlist(){
      dispatch(remove_from_wishlist(productid));
      toast.dark("Removed from wishlist")
    }
  return (
    <div className=' w-full flex h-[85%] gap-3  '>
        <div className='   w-[20%] flex flex-col '>
           {
            productimages.map((url:string,index:number)=>(
        <div onClick={()=>setcurrindex(index)} key={index} className={` cursor-pointer relative w-full h-[80px]  ${currindex===index && " border-blue-700 border-2"}`}> 
        <Img src={url} className={" absolute top-0 bottom-0 right-0 left-0  mx-auto my-auto max-w-[100%] max-h-[100%]  overflow-clip"}/>
        </div>
            ))
           }
        </div>
        <div className=' relative w-[80%] h-full '>
        <Img src={productimages[currindex]} className={" absolute top-0 bottom-0 right-0 left-0 mx-auto my-auto max-w-[100%] max-h-[100%]  overflow-clip"}/>
       {
        wishlist.findIndex((item:any)=>item._id===productid)===-1 ? (<button className=" absolute top-0 right-0 p-2 bg-slate-100 rounded-full text-2xl  cursor-pointer" onClick={addtowishlist}><FcLikePlaceholder/></button>):(<button className=" absolute top-2 right-2 text-2xl  cursor-pointer" onClick={removefromwishlist}><FcLike/></button>)
       }
        </div>
    </div>
  )
}

export default Productimages