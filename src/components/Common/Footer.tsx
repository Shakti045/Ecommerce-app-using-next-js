import { Footerlinks } from "@/data/footer"
import  paymentmethods from "@/assets/images/payment-methods.svg"
import Image from "next/image"
import Link from "next/link"
const Footer = () => {
  return (
       <footer className="  bg-[#2C333F] p-6 flex flex-col gap-2">
         <div className=" flex justify-around">
             <div className=" flex gap-10">
                {
                    Footerlinks.map((item,index)=>(
                        <div className=" flex flex-col gap-2" key={index}>
                            <h1 className=" text-gray-300">{item.heading}</h1>
                            <div className="  flex flex-col  text-sm text-slate-300">
                                {
                                    item.links.map((link,index)=>(
                                        <Link className=" hover:border-b-2 w-fit text-red-100" key={index} href={link.link}>{link.name}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
             </div>
             <div className=" border-[1px] border-[#585D69]">

             </div>
             <div className=" flex gap-10">
                {
                    Footerlinks.map((item,index)=>(
                        <div className=" flex flex-col gap-2" key={index}>
                            <h1 className=" text-gray-300">{item.heading}</h1>
                            <div className=" flex flex-col  text-sm text-slate-300">
                                {
                                    item.links.map((link,index)=>(
                                        <Link className=" hover:border-b-2 w-fit text-red-100" key={index} href={link.link}>{link.name}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
             </div>
         </div>

         <div className=" border-[1px] border-[#585D69] mt-4">
         </div>
         <div className=" flex justify-around text-yellow-50">
            <p>Become A Seller</p>
            <p>Advertise</p>
            <p>Gift Card</p>
            <p>Seller</p>
            <Image style={{width:"auto",height:"auto"}} src={paymentmethods} alt="payment partners"></Image>
         </div>
       </footer>
  )
}

export default Footer