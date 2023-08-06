"use client"
import logo from "@/assets/images/flipkartlogo.svg"
import {BiCart, BiSearch,BiStore} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {BsCart2} from "react-icons/bs"
import Image from "next/image"
import {SlOptionsVertical} from "react-icons/sl"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { set_token } from "@/redux/slices/auth"
import { set_user } from "@/redux/slices/user"
import { reset_cart } from "@/redux/slices/cart"
import {signOut,useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import {BiLogOut} from 'react-icons/bi'
import {FcBusinessman,FcLike} from 'react-icons/fc'
import { useEffect, useState } from "react"
import axios from "axios"
function Navbar(){

   const dispatch:AppDispatch=useDispatch();
   const [isclient,setisclient]=useState(false);
   const [keyword,setkeyword]=useState("");
   const session=useSession();
   const router=useRouter();
   async function logouthandler(){
   const loadingtoast=toast.loading("Please wait.....")
    try{
      const result=await axios.get("/api/auth/logout")
      if(result.status===200){
         dispatch(set_token(null))
         dispatch(set_user(null));
         dispatch(reset_cart());
         router.push("/");
         toast.success("Logout Successfully")
         console.log(session.status);
         
         if(session.status==="authenticated"){
          signOut();
         }
      }
    }catch(err){
      toast.error("Something went wrong")
    }finally{
      toast.dismiss(loadingtoast)
    }
       
   }
   typeof window !== 'undefined' &&( window.onkeydown=(e:any)=>{
      if(keyword.length>0 && e.key==="Enter"){
         setkeyword("");
         router.push(`/searchpage/${keyword}`)
      }
   })
   const {user}=useSelector((state:RootState)=>state.user);
   const {cart}=useSelector((state:RootState)=>state.cart);
   useEffect(()=>{
      setisclient(true);
   },[])
 return (
     <>
      {
         isclient && (
            <nav className=" p-2 bg-slate-100 h-14 flex justify-around items-center text-lg">
            <Link href="/"><Image src={logo} alt="logo"></Image></Link>
            <div className=" h-10 rounded-md text-gray-900 bg-slate-200 flex items-center gap-2">
             <div className="  pl-4">
             <BiSearch/>
             </div>
             <input value={keyword} onChange={(e)=>setkeyword(e.target.value)} className=" w-[400px] h-full outline-none bg-transparent" type="text" placeholder="Search for Products. Brands, and More"></input>
            </div>
            <div className=" flex gap-10">
              <Link href={process.env.NEXT_PUBLIC_API_URL!} className=" flex gap-2 items-center">
                 <BiStore/>
                 Become A Seller
              </Link>
              {
                 user?(<div className="  cursor-pointer group relative flex  gap-2 items-center">
                     <img src={user?.profilephoto} alt="profilephoto" className=" h-[30px] w-[30px] rounded-full"></img>
                    <p>{user?.firstname}</p>
                    <div className=" transition-all  duration-200 rounded-md invisible group-hover:visible  bg-slate-800 w-[50px] h-[50px]  rotate-45 absolute top-[120%] translate-y-1 left-[-5px]"></div>
                    <div className=" text-white  flex flex-col gap-2 items-start  transition-all z-50 duration-200 invisible group-hover:visible  bg-slate-800 p-4 w-[300px] rounded-lg absolute top-[150%] translate-x-[-100px] ">
                    <Link href="/dashboard/orders" className=" flex gap-2 items-center p-2 rounded-md w-full text-start hover:opacity-60 hover:bg-slate-500"><BiCart size={25} /> MY ORDERS</Link>
                       <Link href="/dashboard" className=" flex gap-2 items-center p-2 rounded-md w-full text-start hover:opacity-60 hover:bg-slate-500"><FcBusinessman size={25} /> MY PROFILE</Link>
                       <Link href="/dashboard/wishlist"   className=" flex gap-2 items-center p-2 rounded-md w-full text-start hover:opacity-60 hover:bg-slate-500"><FcLike size={25}/>  MY WISHLIST</Link>
                       <button onClick={logouthandler}  className=" flex gap-2 items-center p-2 rounded-md w-full text-start hover:opacity-60 hover:bg-slate-500"> <BiLogOut size={25}/>LOGOUT</button>
                   </div>
                 </div>):(<Link href="/signin" className="  flex gap-2 items-center">
                 <CgProfile/>
                 Sign In
                </Link>)
              }
              <Link href="/cart" className=" relative flex gap-2 items-center">
                 <BsCart2/>
                  <p className=" relative top-[1px]">Cart</p>
                  <div className=" absolute top-[-13px] left-1 text-green-600 ">
                    {cart.length>0 && cart.length}
                  </div>
              </Link >
              <button>
                 <SlOptionsVertical/>
              </button>
            </div>
         </nav>
         )
      }
     </>
 )
}

export default Navbar;