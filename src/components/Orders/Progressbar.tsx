'use client'
import React from 'react'
import date from 'date-and-time'
interface props{
  lastupdated:string,
  createdon:any,
  status:string,
  cancelhandler:()=>void
}
const Progressbar = ({lastupdated,createdon,status,cancelhandler}:props) => {
  const steps=[
    {id:1, title:'Order Placed', description:'Your order has been placed',},
    {id:2, title:'Confirmed', description:'Your order has been placed'},
    {id:3, title:'Shipped', description:'Your order has been shipped'},
    {id:4, title:'Delivered', description:'Your order has been delivered'}
  ]
  status=status==="PENDING"?"CONFIRMED":status;
let allstatus=[
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    // "CANCELLED"
  ]
  const statusindex=allstatus.indexOf(status);
  const [showmodal,setshowmodal]=React.useState(false);
  return (
    <div className=' mt-10 w-[600px] flex flex-col gap-2  '>
      <div className=' ml-[2%] w-[82%] flex justify-between'>
      {
        statusindex!==-1 && (
          <>
                   {
          steps.map((e,index)=>(
            <p className={` ${statusindex>=index?"text-green-600":" text-slate-400"}`} key={index}>{e.title}</p>
          ))
        }
          </>
        )
      }
      </div>
      {
        statusindex!==-1 &&(
          <div className=" flex  w-full ml-[6%]  ">
        {
            steps.map((e,index)=>(
                <div key={index} className=" w-[32%] flex items-center">
                     <button className={`cursor-default w-[5%] h-[10px]   flex justify-center items-center p-2 rounded-full  ${allstatus.indexOf(status)>=index?"bg-green-600":" bg-slate-300 "}`}>
                        
                     </button>
                     {
                        e.id!==steps.length && (
                            <div className={`border-[1.5px] w-[95%]   ${allstatus.indexOf(status)>index?" border-green-600":" border-slate-300"}`}></div>
                        )
                     }
                </div>
            ))
        }
        </div>
        )
      }
        <div className=" flex  w-[85%] ml-8 justify-between">
            {
                steps.map((e:any,index)=>(
                    <p key={index}>{e.name}</p>
                ))
            }
        </div>

         <>
          {
            status==="CANCELLED"?(<div>
              <p className=' ml-[15%] text-red-600 font-semibold'>Order cancelled on {date.format(new Date((lastupdated)), 'YYYY/MM/DD  HH:MM')}
              </p>
           
            </div>):(
              <div className={` ml-[6%] text-slate-400 flex justify-between w-full`}>
              <p>Order created on {date.format(new Date((createdon)), 'YYYY/MM/DD  HH:MM')}</p>
              <p>Order last updated on {date.format(new Date((lastupdated)), 'YYYY/MM/DD  HH:MM')}</p>
              {
                status==="DELIVERED" && (<>
                <p>Order delivered on {date.format(new Date((lastupdated)), 'YYYY/MM/DD  HH:MM')}</p>
                </>)
              }
              {
                (status==="CONFIRMED" || status==="SHIPPED" )   && (<>
                       <p>Expected to be deliverd by {date.format((date.addDays(new Date(createdon), +2)), 'YYYY/MM/DD  ')} by 9 pm</p>
                </>)
              }
              </div>
            )
          }
         </>
         <div className=' flex justify-center  relative right-7'>
          {
           (statusindex!==-1 && statusindex!==steps.length-1)?(
            <button onClick={()=>setshowmodal(true)} className=' text-rose-700'>Cancel Order</button>
           ):(<></>)
          }
        </div>
         {
            showmodal && (<>
            <div className='  absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center bg-slate-400 bg-opacity-60'>
          <div className=' text-white flex flex-col gap-3  p-10 rounded-md bg-slate-800'>
           <h1 className=' text-xl font-bold'>Do you really want to cancel your order?</h1>
           <h1 className='  font-bold'>Once it is canceled it will not be <br></br> delivered to you</h1>
           <h1 className='  font-bold'>Amount will be reversed back to your original <br></br> payment method within 2-3 business days</h1>
           <h1 className=' font-bold'>
       
            You will loose all your reward points
           </h1>
           <div className=' flex gap-4'>
              <button onClick={()=>setshowmodal(false)} className=' bg-rose-700 p-2 rounded-md'>NOT CANCEL</button>
              <button onClick={()=>{
                setshowmodal(false)
                cancelhandler()
              }} className=' bg-green-600 p-2 rounded-md'>CANCEL ORDER</button>
           </div>
          </div>
        </div>
            </>)
         } 
    </div>
   )
  
}
  


export default Progressbar