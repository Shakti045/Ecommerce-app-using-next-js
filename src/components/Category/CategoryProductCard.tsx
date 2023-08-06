'use client'
import Img from "../Common/Img"
import { FcRating } from "react-icons/fc"
import Highlights from "../product/Highlights"
import assuredimage from "@/assets/images/fa_62673a.png"
import Image from "next/image"
import {BsDot} from "react-icons/bs"
const CategoryProductCard = ({_id,productimages,sellprice,originalprice,discount,highlights,assuredproduct,ratings,productname,bestselling}:any) => {
  return (
    <div className=" w-full p-3 border-t-[1px] border-b-[1px] border-slate-300 flex justify-between">
     <div className=" relative w-[200px] h-[200px]">
      <Img src={productimages[0]}  className={" max-h-[100%] max-w-[100%] absolute overflow-clip mx-auto my-auto top-0 bottom-0 right-0 left-0"}/>
     </div>
     <div className=" flex flex-col gap-2 w-[400px]">
        <h1 className="  font-bold text-lg ">
            {productname.substring(0,80)}
        </h1>
        {
                bestselling.indexOf(_id)>-1 && (
                    <div className=" w-fit bg-cyan-600 text-white text-sm rounded-md px-2 py-1">
                       <p>#BEST SELLER</p>
                    </div>
                )
            }
        <div className=' flex gap-2 items-center'>
        <div className=' w-fit flex gap-1 items-center p-1 px-2  text-sm bg-green-500 text-white rounded-md'>
                4.2 <FcRating/>
            </div>
            <p className=' opacity-60'>{`( ${ratings.length} ) Ratings`}</p>
           
        </div>
         <div className=" flex flex-col gap-1">
            {
                highlights.map((e:any,i:number)=>{
                    return <p  key={i} className=" flex gap-2 text-sm opacity-70">
                        <BsDot/>
                        {e}
                    </p>
                })
            }
         </div>
     </div>
     <div className=" flex gap-2 items-baseline">
     <div className=' flex flex-col  items-center'>
            <h1 className=' text-center text-2xl  text-red-500 font-bold'>₹{sellprice}</h1>
            <div className=" flex gap-2 text-sm  opacity-75">
            <h1 className=' text-center text-gray-500 font-bold line-through'>₹{originalprice}</h1>
            <h1 className=' text-center text-green-500 font-bold'>{discount}% off</h1>
            </div>
        </div>
        {
            assuredproduct && (
             <Image className=" h-fit w-[80px]" src={assuredimage} alt="assuredproduct"/>
            )
        }
     </div>
    </div>
  )
}

export default CategoryProductCard