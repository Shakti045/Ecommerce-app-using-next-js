import React from 'react'
import Productimages from './Productimages'
import assuredimage from "@/assets/images/fa_62673a.png"
import Image from 'next/image'
import { FcRating } from 'react-icons/fc'
import Highlights from './Highlights'
import Offer from './Offer'
import Specifications from './Specifications'
import ProductButtons from './ProductButtons'
import Img from '../Common/Img'
import { BiStar } from 'react-icons/bi'
interface Product{
  _id:number,
  productname:string,
  productimages:Array<string>,
  originalprice:number,
  sellprice:number,
  discount:number,
  relatedcategory:number,
  assuredproduct:boolean,
  description:string,
  highlights:Array<string>,
  attributes:any,
  seller:any,
  numberofproducts:number,
  numberofpurchases:number,
  averageRating:number,
  numberofratings:number,
  ratings:Array<any>
}
const offers:string []=[
   "Bank Offer Flat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account",
   "Bank Offer 5% Cashback on Flipkart Axis Bank Card",
   "Extra 5% Off Up to ₹250 on Microwave",
   "Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or more",
   "Special Price Get extra ₹5019 off (price inclusive of cashback/coupon)",
   "Partner Offer Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000*",
   "Partner Offer Value Added Benefits",
   "Partner Offer Value Added Benefits",
   "Partner OfferValue Added Benefits"
]
const Productpage = ({_id,productname,productimages,originalprice,sellprice,discount,relatedcategory,assuredproduct,description,highlights,attributes,seller,numberofproducts,numberofpurchases,averageRating,numberofratings,ratings
}:Product) => {
  const cartitem={
    _id,
    productname,
    productimage:productimages[0],
    originalprice,
    sellprice,
    discount,
    seller:seller,
    quantity:1,
  }
  return (
    <div className=' w-full h-full flex justify-between '>
 
       
       <div className='   w-[40%]   h-full flex flex-col  '>
       <Productimages wishlistitem={cartitem} productid={_id} productimages={productimages}/>
        <ProductButtons numberofproducts={numberofproducts} _id={_id} cartitem={cartitem} />
       </div>
      <div className=' w-[55%] flex flex-col gap-2 h-full overflow-y-scroll '>

      <div className=' flex flex-col gap-2'>
        <h1 className=' font-bold text-xl'>{productname}</h1>
        <div className=' flex gap-2 items-center'>
        <div className=' w-fit flex gap-1 items-center p-1 px-2  text-sm bg-green-500 text-white rounded-md'>
                {averageRating.toFixed(2)} <FcRating/>
            </div>
            <p className=' opacity-60'>{`( ${numberofratings} ) Ratings`}</p>
            <Image  width={80} src={assuredimage} alt='assured'/>
            <p className=' opacity-60'>{`(${numberofpurchases}) Number of purchase`}</p>
        </div>
        <div className=' flex gap-2 items-center'>
            <h1 className=' text-center text-3xl  text-red-500 font-bold'>₹{sellprice}</h1>
            <h1 className=' text-center text-gray-500 font-bold line-through'>₹{originalprice}</h1>
            <h1 className=' text-center text-green-500 font-bold'>{discount}% off</h1>
        </div>
        <div className=' flex gap-2'>
          {numberofproducts>0? numberofproducts<10?<p className=' text-red-500'>{`Hurry only (${numberofproducts} items left)`}</p>:<p className=' flex gap-2 text-green-500 font-bold'>In Stock</p>:<p className=' text-red-500 font-bold'>Out of Stock</p>}
        </div>
      </div>
         <Offer offers={offers}/>
         <Highlights highlights={highlights}/>
         <div className=' mt-4 flex gap-3 '>
          <h1 className=' font-bold '>Product Description</h1>
          <p>{description}</p>
         </div>
         <div className=' mt-4 flex gap-3 items-center'>
          <h1 className=' font-bold '>Seller</h1>
          <p>{seller?.businessname?seller.businessname:'Shakti-business'}</p>
         </div>
         <Specifications attributes={attributes}/>
         <div className=' mt-7'>
            <h1 className=' font-bold text-xl'>Ratings and Reviews</h1>
            <div className=' mt-4 grid grid-cols-2 gap-5'>
              {
                ratings.map((rating,index)=>{
                  return(
                    <div key={index} className=' bg-slate-200 p-3 rounded-md flex gap-3 '>
                      <Img  className={" h-[50px] w-[50px] rounded-full"} src={rating.userphoto} />
                      <div className=' flex flex-col gap-1'>
                        <h1 className=' font-bold'>{rating.username}</h1>
                        <h1 className=' flex items-center gap-1'>{rating.rating} <BiStar/></h1>
                        <p>{rating.review}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
         </div>
      </div>
    </div>
  )
}

export default Productpage;