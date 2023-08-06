'use client'
import {BsCart2} from "react-icons/bs"
import {MdOutlineArrowForwardIos} from "react-icons/md"
import { FcBusinessman } from "react-icons/fc";
import {BsFillBagHeartFill} from "react-icons/bs"
import { usePathname } from "next/navigation";
import Link from "next/link";
import {AiOutlinePoweroff} from "react-icons/ai"
import { memo } from "react";
import { useState,useEffect } from "react";
const links=[
    {
        name:"ACCOUNT SETTINGS",
        icon:<FcBusinessman size={25} className=" inline-block" />,
        sublinks:[
            {
                name:"PROFILE INFORMATION",
                link:"/dashboard"
            },
            {
                name:"MANAGE ADDRESSES",
                link:"/dashboard/address"
            }
        ]
    },
    {
        name:"MY STUFF",
        icon:<BsFillBagHeartFill size={25} className=" inline-block" />,
        sublinks:[
            {
                name:"MY REVIEWS & RATINGS",
                link:"/dashboard/reviews"
            },
            {
                name:"MY WISHLIST",
                link:"/dashboard/wishlist"
            },
            {
                name:"SUPERCCOIN ZONE",
                link:"/dashboard/supercoin"
            }
        ]
    }        
]
const Sidemenu = ({user}:{user:any}) => {
    const pathname=usePathname();
    const [isclient,setisclient]=useState(false);
    useEffect(()=>{
        setisclient(true);
    },[])
    // const {user}=useSelector((state:any)=>state.user);
    // console.log("printing in side menu",user);
  return (
    <>
     {
            isclient && (
                <div className=' w-full h-full flex flex-col gap-4 '>
                <div className=" rounded-md w-full flex gap-2 items-center p-2 bg-white mt-4">
                  <div>
                      <img src={user?.profilephoto} width={50} height={50} className=" rounded-full" alt="profilephoto" />
                  </div>
                  <div className=" flex flex-col ">
                      <p>Hello,</p>
                      <h1 className="  font-semibold">{user?.firstname}  {user?.lastname}</h1>
                  </div>
                </div>
                <div className=" w-full h-full bg-white p-4 rounded-md">
                    <div>
                          <Link href="/dashboard/orders" className={` opacity-80 hover:text-blue-600 flex items-center justify-between border-b-2 pb-3  font-semibold ${pathname==="/dashboard/orders" && " text-blue-700"}`}>
                              <div className=" flex gap-2 "><BsCart2  size={20} className=" inline-block" />MY ORDERS</div>
                              <MdOutlineArrowForwardIos className=" inline-block" />
                          </Link>
                    </div>
                    <div>
          
                      {
                          links.map((link,index)=>{
                              return <div className=" mt-3 border-b-2 pb-3 flex flex-col gap-3" key={index}>
                               <h1  className=" font-bold flex gap-2">
                                   {link.icon}
                                   {link.name}
                               </h1>
                                 <div className=" flex flex-col gap-3">
                                 {
                                  link.sublinks.map((sublink,index)=>{
                                      return <Link className={`rounded-md hover:bg-slate-600 p-2 w-full ${pathname===sublink.link && " text-blue-600 font-semibold "}`} key={index} href={sublink.link}>
                                          <p className=" text-sm ml-7">{sublink.name}</p>
                                      </Link>
                                  })
                               }
                                 </div>
                              </div>
                          })
                      }
                    </div>
                    <div className=" text-sm flex w-full   mt-5 ">
                      {/* <button className=" flex gap-2 items-center">
                          <AiOutlinePoweroff  className=" inline-block" />
                          <span className=" ml-2">LOGOUT</span>
                      </button> */}
                    </div>
                </div>
              
              </div>
            )
     }
    </>
  )
}

export default memo(Sidemenu);