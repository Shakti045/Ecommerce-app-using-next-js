'use client'
import { useDispatch } from "react-redux"
import Img from "../Common/Img"
import { AppDispatch } from "@/redux/store/store"
import { remove_from_wishlist } from "@/redux/slices/wishlistitem"
// import { add_to_cart } from "@/redux/slices/cart"
import {toast} from "react-toastify"
import {AiFillDelete} from "react-icons/ai"
import Link from "next/link"
const WishListItem = ({item}:{item:any}) => {
  console.log(item);
    const dispatch:AppDispatch=useDispatch();
    const removeitem=()=>{
        dispatch(remove_from_wishlist(item._id))
        toast.success("Item removed from wishlist")
    }
    // const removetocart=()=>{
    //     dispatch(remove_from_wishlist(item._id))
    //     dispatch(add_to_cart(item))
    //     toast.success("Item moved to cart")
    // }
  return (
    <div className=' flex  border-b-[1px] border-slate-400   justify-between  w-full p-4'>
       <Link className=" flex  w-[90%]  gap-10" href={`/product/${item._id}`}>
        <div  className={`  relative w-[150px]  h-[150px]`}> 
        <Img src={item.productimage} className={" absolute top-0 bottom-0 right-0 left-0 mx-auto my-auto max-w-[100%] max-h-[100%]  overflow-clip"}/>
        </div>
        <div className='  w-[400px]  flex flex-col gap-2'>
            <h1 className=' text-lg font-semibold'>{item.productname.substring(0,80)}</h1>
            <h1 className=' font-light'>Seller: {item?.seller?.businessname}</h1>
            <div className=' flex gap-2'>
            <h1 className=' text-lg font-semibold'>₹{item.sellprice}</h1>
            <h1 className=' text-lg font-semibold line-through text-gray-500'>₹{item.originalprice}</h1>
            <h1 className=' text-lg font-semibold text-green-500'>{item.discount}% off</h1>
        </div>
        </div>
       </Link>
       <div  onClick={removeitem} className=" cursor-pointer  w-fit h-fit flex flex-col  justify-center p-2 rounded-md bg-slate-400 items-center">
        <button  className='  text-red-600 font-bold '><AiFillDelete/></button>
       </div>
    </div>
  )
}

export default WishListItem