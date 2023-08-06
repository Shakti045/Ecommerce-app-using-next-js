'use client'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { RootState } from "@/redux/store/store"
import WishListItem from "@/components/dashboard/WishListItem"
import emptywishlist from "@/assets/images/mywishlist-empty_39f7a5.png"
import Image from "next/image"
const page = () => {
    const dispatch:AppDispatch=useDispatch();
    const {wishlist}=useSelector((state:RootState)=>state.wishlistitem);
    console.log(wishlist);
  return (
    <div className=' flex flex-col gap-4 p-5 w-full h-full  bg-white'>
       {
        wishlist.length===0 ? (<div className=' flex flex-col gap-4   w-full h-[80vh] items-center justify-center   font-semibold'>
            <Image src={emptywishlist} alt="emptywishlist" width={200} height={200}/>
            <h1  className=" font-bold">Empty Wishlist</h1>
            <p className=" text-sm">You have no items in your wishlist. Start adding!</p>
        </div>):<div   className=' overflow-y-scroll flex flex-col gap-4 p-5 w-full'>
        <div className=" border-b-2 pb-3">
            {`My Wishlist (${wishlist.length})`}
        </div>
         {
              wishlist.map((item:any,index:number)=>{
                return <WishListItem item={item} key={index}/>
              }
                )
         }
        </div>
       }
    </div>
  )
}

export default page