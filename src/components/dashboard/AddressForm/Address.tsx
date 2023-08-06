'use client'
import React from 'react'
import {SlOptionsVertical} from "react-icons/sl"
const Address = (
    {data,deleteaddress,makedefault}:{data:any,deleteaddress:any,makedefault:any}
) => {
    console.log(data)
  return (
    <div className=' flex w-full justify-between p-3 border-[1px] border-slate-300'>
        <div className=' flex flex-col '>
        <div className=' flex gap-3'>
            <h1 className=' font-bold'>{data.fullname}</h1>
            <p>{data.mobilenumber}</p>
        </div>
        <div className=' flex gap-3'>
            <h1>{data.locality}</h1>
            <h1>{data.district}</h1>
        </div> 
        <div className=' flex gap-3'>   
            <h1>{data.state}</h1>
            <h1>{data.pincode}</h1>
            {
                data.defaultaddress && (
                    <h1 className=' text-green-700'>Default Address</h1>
                )
            }
        </div>
        </div>
        <div className='  relative group h-fit'>
            <SlOptionsVertical size={20}/>
            <div className=' invisible group-hover:visible flex flex-col  bg-slate-200 w-[150px] p-2 rounded-md  h-fit absolute top-[-5px] right-0 '>
             {
                !data.defaultaddress && (
                    <button onClick={makedefault} className=' hover:text-blue-700'>
                    Mark As Deafult
                  </button>
                )
             }
              <button className=' hover:text-blue-700'>
                Edit
              </button>
              <button onClick={deleteaddress} className=' hover:text-blue-700'>
                Delete
              </button>
            </div>
        </div>
    </div>
  )
}

export default Address