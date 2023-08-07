'use client'
import React, { useEffect , useState } from 'react'
import Loading from "@/app/loading"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import supercoinimage from "@/assets/images/super_coin_icon_22X22.webp"
import Image from 'next/image'
import Supercoinbanner from "@/assets/images/Earnrate-banner-DT (1).webp"
import ReactPlayer from 'react-player'

const page = () => {
 const {token}=useSelector((state:any)=>state.auth)
 const [loading, setLoading] = useState(true)
 const [supercoins, setSupercoins] = useState(0)


 async function getsupercoins(){
    try{
       console.log(token)
       const res = await axios.get("/api/user/getsupercoins",{
            headers:{
                  Authorization:`Bearer ${token}`
            }  
       })
       if(res.status === 200){
        console.log(res.data)
          setSupercoins(res.data.Data)
       }
    }catch(err:any){
       console.log(err)
       toast.error(err.message)
    }finally{
       setLoading(false)
    }
  }
 useEffect(()=>{
    getsupercoins()
 },[])
  return (
    <div className=' overflow-y-scroll supercoins rounded-md flex flex-col gap-4 p-5 w-full h-full  bg-white'>
      {
            loading?<Loading/>:<div className=' flex flex-col gap-3'>
                <h1 className="flex text-2xl gap-2 items-center font-bold "><p className="">SuperCoin Balance </p><Image className=" w-[25px]" src={supercoinimage} alt='coin'/> <p className=' text-blue-700'>{supercoins}</p></h1>
                <div className=' w-full h-[200px] relative'>
                     <Image className=' relative top-0 bottom-0 right-0 left-0 max-h-[100%] max-w-[100%]' src={Supercoinbanner} alt='supercoinbanner' layout='responsive' objectFit='contain'/>
                </div>
                <div className=' w-full flex'>
                  <ReactPlayer loop playing url='https://res.cloudinary.com/djq1vmvy4/video/upload/v1691047797/animated_medium20211108-27044-jnczo0_sd3wwl.mp4'   width='50%' height='100%'/>
                  <ReactPlayer loop playing url='https://res.cloudinary.com/djq1vmvy4/video/upload/v1691048768/animated_medium20211108-1718-186rt68_dvgphk.mp4'   width='50%' height='100%'/>
                </div>
            </div>
      }
   </div>
  )
}

export default page
