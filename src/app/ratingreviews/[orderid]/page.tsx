'use client'
import { useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "@/components/Common/Loader"
import { ratingurl } from "@/services/externalurl"
import Img from "@/components/Common/Img"
import { BiStar } from "react-icons/bi"
import Starrating from "@/components/Rating/Starrating"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
const staticdata=[
  {
    qsn:"Have you used this product?",
    answer:"Your review should be about your experience with the product"
  },
  {
    qsn:"Why review a product?",
    answer:"Your valuable feedback will help fellow shoppers decide!"
  },
  {
    qsn:"How to review a product?",
    answer:"Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre"
  }
]

const page = () => {
    const productid=useSearchParams().get("productid")
    const {user}=useSelector((state:RootState)=>state.user);
    const [rating,setrating]=useState(0);
    const [ratingexist,setratingexist]=useState(false);
    const [product,setproduct]=useState<any>('');
    const [loading,setloading]=useState(true)
   const {register,handleSubmit,formState:{errors},setValue}=useForm();
   const getpreviousreview=async()=>{
    try{
     const result=await axios.post(ratingurl.getuserrating,{userid:user._id,productid:productid});

      if(!result.data.Success && result.data.Message==="Rating not found"){
        setratingexist(false);
        setproduct(result.data.product);
      }else{
        if(result.data.Success){
          console.log(result.data);
          setratingexist(true);
          setrating(result.data.rating.rating);
          setproduct(result.data.product); 
          setValue("review",result.data.rating.review);
        }
      }

    }catch(err){
      console.log(err);
    }finally{
      setloading(false)
    }
   }

   async function createreview(data:any){
     const loadingtoast=toast.loading("Please wait.....")
     try{
 
       const result=await axios.post(ratingurl.generalratinng,{userid:user._id,productid:productid,rating:rating,review:data.review,usermail:user.email,username:user.firstname,userphoto:user.profilephoto});
        if(result.data.Success){
          await getpreviousreview();
          toast.success("Review created successfully");
        }
     }catch(err){
        console.log(err);
         toast.error("Something went wrong");
     }finally
      {
        toast.dismiss(loadingtoast);
      }
   }

   
   useEffect(()=>{
      getpreviousreview();
   },[])
  return (
    <div className=" w-full flex flex-col gap-4 p-4 ">
     {
        loading?<Loader/>:(
          <>
            <div className="  flex justify-between  bg-white rounded-md  p-4">
           <h1 className=" font-bold text-xl">Ratings & Reviews</h1>
           <div className=" flex flex-row gap-3 items-center ">
            <div className=" relative h-[50px] w-[70px] ">
          <Img src={product?.productimages[0]}  className="  absolute top-0 bottom-0 right-0 left-0 max-w-full max-h-full mx-auto mt-auto overflow-clip"/>
            </div>
            <div className=" flex flex-col ">
              <h1 className=" font-bold">{product?.productname.substring(0,30)}...</h1>
              <div className="  flex  gap-3 items-center">
                <div className=" flex gap-1 items-center px-4 bg-green-800 rounded-md text-white">
                  {product.averageRating?product.averageRating:0}<BiStar/>
                </div>
                <h1>{`(${ product.numberofratings?product.numberofratings:0 })`}</h1>
              </div>
            </div>
           </div>
           </div>

           <div className=" w-full rounded-md  flex  gap-4">
            <div className="w-[30%] bg-white p-3 rounded-md">
            <div className=" border-[1px] border-slate-300 pb-4 p-3">
               <div className=" font-bold">What makes a good review</div>
             </div>
             {
              staticdata.map((item,index)=>(
                <div key={index} className=" border-[1px] border-slate-300 pb-4 p-3">
                <div className=" font-bold">{item.qsn}</div>
                <div className=" text-sm">{item.answer}</div>
              </div>
              ))
             }
            </div>

            <div className="w-[70%] flex flex-col gap-5 bg-white p-3 rounded-md">
              <div className=" w-full flex flex-col">

                 <div className="pb-4 border-b-[1px] border-slate-400 w-full flex flex-col gap-3">
                 <h1 className=" font-bold ">{
                  ratingexist?"Your rating":"Rate this product"
                 }</h1>
                 <Starrating rating={rating} setrating={setrating}/>
                 </div> 
                 <div>
                </div>  
             </div>
             <div className=" flex flex-col gap-3">
              <h1 className=" font-bold">
                {
                  ratingexist?"Your review":"Review this product"
                }
              </h1>
              <textarea readOnly={ratingexist} rows={6} className=" border-[1px] border-slate-300 rounded-md p-3" placeholder="Write your review here..."
               {
                  ...register("review",{required:true})
               } 
              ></textarea>
              {
                errors.review && <span className=" text-red-500">Review is required</span>
              }
             </div>
             <div className=" flex  justify-end">
             {
                ratingexist?(<p className="text-green-800">Thank For your review</p>):(
                  <button onClick={handleSubmit(createreview)}  className=" px-3 py-1 bg-black text-white  rounded-md">SUBMIT</button>
                )
             }
             </div>
            </div>
           </div>
          </>
        )
     }
    </div>
  )
}

export default page;