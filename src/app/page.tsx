"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loading from "./loading"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay,Navigation,Pagination}  from "swiper"
import card from "@/assets/images/bannerimages/card.webp"
import Image from "next/image"
import Productcard from "@/components/Home/Productcard"
import { categoryurl , producturl} from "@/services/externalurl"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { set_token } from "@/redux/slices/auth"
import { set_user } from "@/redux/slices/user"
import Jwt  from "jsonwebtoken"
import {signOut,useSession} from "next-auth/react"
export default function Page() {
  const dispatch:AppDispatch = useDispatch();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const banners=["https://res.cloudinary.com/djq1vmvy4/image/upload/v1691358016/banner9_nf8wkg.webp"];  
  const [products, setProducts] = useState([])
  const [topdiscountproducts, setTopdiscountproducts] = useState([]);
  const [topsellingproducts, setTopsellingproducts] = useState([]);
  const [newproducts, setNewproducts] = useState([]);
  const {token}=useSelector((state:any)=>state.auth);
  // async function getallcategory() {

  //   try{
  //     const res = await axios.get(categoryurl.getallcategories)
  //     if(res.status === 200){
  //       setData(res.data.Categories)
  //     }
  //   }catch(err:any){
  //     console.log(err)
  //     toast.error(err.message)
  //   }
  // }

  async function getallproducts() {
      
      try{
        const res = await axios.get(producturl.getallproducts);
        if(res.status === 200){
          const {Topdiscountproducts,Bestsellingproducts,Newproducts,Products,Categories} = res.data;
          setData(Categories);
          setProducts(Products);
          setTopdiscountproducts(Topdiscountproducts);
          setTopsellingproducts(Bestsellingproducts);
          setNewproducts(Newproducts);
        }
      }catch(err:any){
        console.log(err)
        toast.error(err.message)
      }
  }



   async function initialload(){
    // await getallcategory();
    await getallproducts();
    setLoading(false)
   }

   const session=useSession();
   async function logouthandler(){
    const loadingtoast=toast.loading("Please wait.....")
     try{
       const result=await axios.get("/api/auth/logout")
       if(result.status===200){
          dispatch(set_token(null))
          dispatch(set_user(null));
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

   async function checktokenvalidity(){
      if(token!==null){
        const payload:any =Jwt.decode(token); 
        if(payload?.exp * 1000 < Date.now()){
          await  logouthandler();
          return toast.error("Session Expired Login Again");
        }
      }
    }
    
  useEffect(()=>{
    checktokenvalidity();
    initialload()
  },[]);
  return (
      <>
        {
          loading ? <Loading/> :(<div className=" flex flex-col gap-3">
          <div className="  mx-4 mt-4 p-2 bg-slate-200 shadow-lg  flex justify-around">
          {
            data.map((item:any,index)=>(
              <Link href={`/category/${item._id}`} key={index} className=" group flex flex-col items-center">
              <img className=" h-[70px] w-[70px] rounded-full" src={item?.picture} alt="categoryiamge"></img>
              <h1 className=" group-hover:text-blue-700 font-bold">{item?.name}</h1>
              </Link>
            ))
          }
          </div>
          <div className=" mt-3 mx-4">
          <Swiper
                  loop={true}
                  pagination={true}
                  modules={[Autoplay,Navigation,Pagination]}
                  
                  autoplay={{
                  delay: 2000,
                  disableOnInteraction:false,
                  pauseOnMouseEnter:true
                  }}
                  navigation={true}  slidesPerView={1} 
                
                >
                    {
                      banners.map((item:any,index)=>(
                        <SwiperSlide key={index}>
                        <img   src={item} alt="banner" />
                        </SwiperSlide>
                      ))
                    }
                   </Swiper>
                   <Image  src={card} alt="cardimage"></Image>
          </div>
           <div className=" rounded-md flex flex-col gap-3 p-2 bg-white   mx-4 mt-4">
             <div className=" border-b-2 border-slate-200 pb-3">
             <h1 className=" font-bold text-2xl ">Top Discount Products</h1>
              <h1 className=" opacity-60">Offers never comes again</h1>
             </div>
              <Productcard products={topdiscountproducts} />
           </div>
           <div className=" rounded-md flex flex-col gap-3 p-2 bg-white   mx-4 mt-4">
                <div className=" border-b-2 border-slate-200 pb-3">
                <h1 className=" font-bold text-2xl ">Best Selling Products</h1>
              <h1 className=" opacity-60">Peoples loved theese products</h1>
                </div>
              <Productcard products={topsellingproducts} />
           </div>
           <div className= " rounded-md flex flex-col gap-3 p-2 bg-white    mx-4 mt-4">
              <div className=" border-b-2 border-slate-200 pb-3">
              <h1 className=" font-bold text-2xl ">New To Flipkart</h1>
              <h1 className=" opacity-60">Be The first to have theese</h1>
              </div>
              <Productcard products={newproducts} />
           </div>
           <div className="  rounded-md flex flex-col gap-3 p-2 bg-white    mx-4 mt-4">
             <div className=" border-b-2 border-slate-200 pb-3">
             <h1 className=" font-bold text-2xl ">Many More Products</h1>
              <h1 className=" opacity-60">Explore infinite products</h1>
             </div>
              <Productcard products={products} />
           </div>
        </div>)
        }
      </>
  )
}  

