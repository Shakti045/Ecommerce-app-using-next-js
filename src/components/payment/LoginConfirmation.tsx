'use client'
import React from 'react'
import {TiTick} from "react-icons/ti"
import {  useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { set_paymentstep } from '@/redux/slices/payment'
import {AiFillBell,AiFillStar} from "react-icons/ai"
import {BiSolidTruck} from "react-icons/bi"
const LoginConfirmation = ({token,user}:{token:any,user:any}) => {
    const {paymentstep}=useSelector((state:any)=>state.payment);
    const dispatch:AppDispatch=useDispatch();
    function handlelogout(){

    }
  return (
       <>
           {
            token && (
                <>
                           {
            paymentstep!=1?
            (
                <div className=' rounded-md w-full flex justify-between p-3 bg-white'>
                <div className=' flex  gap-3'>
                 <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-slate-200'>
                  <h1 className=' text-blue-700'>1</h1>
                 </div>
                 <div className=' flex flex-col gap-3'>
               <div className=' flex gap-2 items-center'>
                  <h1 className=' text-lg text-slate-400'>LOGIN</h1>
                  <TiTick className=' text-green-500'/>
              </div>
              <div className=' flex gap-2'>
                  <h1 className=' font-bold'>{user?.firstname} {user?.lastname}</h1>
                  <h1 className=' text-slate-500'>{user?.email}</h1>
              </div>
                 </div>
                 </div>
                  <div>
                      <button onClick={()=>dispatch(set_paymentstep(1))}  className=' p-2 px-5 text-blue-600  font-semibold border-[1px] border-slate-300'>CHANGE</button>
                  </div>
                </div>
            ):
            (
                <div className=' w-full flex flex-col '>
                <div  className=' p-3 rounded-t-md  flex  items-center gap-4 bg-blue-700 text-white'>
                <div className=' h-[25px] w-[25px]  flex flex-col justify-center items-center  bg-white '>
                <h1 className='  text-blue-600 '>1</h1>
                </div>
                <h1 className=' text-lg font-bold'>
                    LOGIN
                </h1>
                </div>
                <div className=' pb-7 flex justify-around w-full bg-white p-3 rounded-b-md '>
                  <div className=' flex flex-col gap-3'>
                    <h1 className=' flex gap-3 text-slate-400'>Name   <p className=' font-bold text-black'>
                    {user?.firstname} {user?.lastname}</p></h1>
                    <h1 className=' flex gap-3 text-slate-400'>Email   <p className=' font-bold text-black'>
                    {user?.email}</p></h1>
                    <button onClick={handlelogout} className='text-blue-700'>Logout & Sign in to another account</button>
                    <button onClick={()=>dispatch(set_paymentstep(2))} className=' p-2 bg-orange-600 text-white'>
                        CONTINUE CHECKOUT
                    </button>
                  </div>
                  <div className=' flex flex-col gap-3'>
                    <p className=' text-slate-400'>Advantages of our secure login</p>
                     <p className=' flex gap-2 items-center '>
                        <BiSolidTruck color='blue'/> Easily track Orders & Hassle free returns
                     </p>
                     <p className=' flex gap-2 items-baseline '>
                       <AiFillBell color='blue'/> Get relevant alerts and recommendation
                     </p>
                        <p className=' flex gap-2  items-center'> 
                         <AiFillStar color='blue'/> Wishlist,Reviews,Ratings & more
                        </p>
                  </div>
                </div>
               </div>
            )
         }
                </>
            )
           }
       </>
  )
}

export default LoginConfirmation;



