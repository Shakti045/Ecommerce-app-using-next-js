import React from 'react'
import {MdLocalOffer} from "react-icons/md"
const Offer = ({offers}:{offers:string []}) => {
  return (
    <div className=' flex flex-col gap-2'>
      <h1 className=' font-bold text-lg'>Available offers</h1>
      <div className=' flex flex-col  gap-2'>
      {
        offers.map((e,index)=>{
           return <div className=' flex gap-3 items-center ' key={index}>
             <MdLocalOffer size={20} color='green'/>
             <p className=' text-sm '>{e}</p>
           </div>
        })
      }
      </div>
      
    </div>
  )
}

export default Offer