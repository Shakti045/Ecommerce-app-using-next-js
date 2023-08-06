import {FcLike,FcLikePlaceholder,FcRating} from 'react-icons/fc'
import Img from '../Common/Img'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { add_to_wishlist, remove_from_wishlist } from '@/redux/slices/wishlistitem'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
const Singleproduct = ({product}:{product:any}) => {
    const dispatch:AppDispatch=useDispatch();
    const {wishlist}=useSelector((state:RootState)=>state.wishlistitem);
    const {_id,productname,productimages,originalprice,sellprice,discount,averageRating,numberofratings}=product
    function addtowishlist(){
        dispatch(add_to_wishlist({...product,productimage:productimages[0]}));
        toast.dark("Added to wishlist")
        }
        function removefromwishlist(){
        dispatch(remove_from_wishlist(_id));
        toast.dark("Removed from wishlist")
        }

  return (
 <div className=' relative' >
       <Link href={`/product/${_id}`} className=' group cursor-pointer flex flex-col items-center gap-2 w-[220px]'>
        <div className=' relative w-[150px] h-[150px] '>
        <Img src={productimages[0]} className={" absolute top-0 bottom-0 right-0 left-0 mx-auto my-auto max-w-[100%] max-h-[100%]  overflow-clip"}/>
       
        </div>
        <h1 className=' opacity-80  group-hover:text-blue-600 text-center'>{productname.substring(0,50)}</h1>
         <div className=' flex items-center gap-3'>
            <div className=' w-fit flex gap-1 items-center p-1 px-2  text-sm bg-green-500 text-white rounded-md'>
               {averageRating.toFixed(2)} <FcRating/>
            </div>
            <p className=' opacity-60'>{`( ${numberofratings} )`}</p>
         </div>
        <div className=' flex gap-2 items-center'>
            <h1 className=' text-center  text-red-500 font-bold'>₹{sellprice}</h1>
            <h1 className=' text-center text-gray-500 font-bold line-through'>₹{originalprice}</h1>
            <h1 className=' text-center text-green-500 font-bold'>{discount}% off</h1>
        </div>
        
    </Link>
    {
            wishlist.findIndex((item:any)=>item._id===_id)===-1 ? (<button className=' absolute top-0  right-5' onClick={addtowishlist}><FcLikePlaceholder/></button>):(<button className=' absolute top-0 right-5' onClick={removefromwishlist}><FcLike/></button>)
    }
 </div>
  )
}

export default Singleproduct



