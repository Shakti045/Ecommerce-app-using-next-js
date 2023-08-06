'use client'
import React from 'react'
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';

const Filter = ({filters,getfiltereddata,resetfilter}:{filters:any,getfiltereddata:any,resetfilter:any}) => {
    const [myfilters,setmyfilters]=useState<any>({});
    function filterhandler(value:any,key:any){
        const index=myfilters[key].indexOf(value);
        console.log(index);
        if(index===-1){
            const newfilter={...myfilters};
            newfilter[key].push(value);
            setmyfilters(newfilter);
        }else{
            const newfilter={...myfilters};
            const newvalue=newfilter[key];
            newvalue.splice(index,1);
            newfilter[key]=newvalue;
            setmyfilters(newfilter) 
        }
    }
   function checkfilter(){
     for (const key in myfilters){
        if(myfilters[key].length>0){
            return true;
        }
     }
     return false;
   }
    async function applyfilter(){
     const result=checkfilter();
     if(!result){
       return toast.dark("Please tick the desired filters")
     }
     getfiltereddata(myfilters);
    }
    function initfilter(){
        const dummyfilter:any={};
        const keys=filters.map((e:any)=>{
           return e.key
        })
        keys.forEach((e:string)=>{
           dummyfilter[e]=[];
        })
        setmyfilters(dummyfilter);
    }
    useEffect(()=>{
      initfilter();
    },[])
  return (
    <div className=' flex flex-col gap-4 p-3 rounded-md w-[20%]   h-full  bg-white'>
        <div className=' border-b-[1px] border-slate-300 pb-3'>
        <h1 className=' text-lg font-bold'>Filters</h1>
        
        </div>
        <div className=' flex flex-col gap-3 text-white mt-3'>
            <button onClick={applyfilter} className=' p-2 bg-orange-800'>APPLY FILTERS</button>
            <button onClick={()=>{
                resetfilter();
                initfilter();
            }} className=' p-2 bg-slate-900'>RESET FILTERS</button>
         </div>
        <div className=' filter overflow-y-scroll flex flex-col gap-3  mt-3'>
        {
            filters.map((e:any,index:number)=>{
                return <div key={index} className=''>
                        <div className=' font-bold border-b-[1px] border-slate-300 pb-2'>
                             {e?.key}
                        </div>
                        <div>
                            {
                                e.values.map((v:string,i:number)=>{
                                    return <div key={i} className=' mt-3 flex gap-2 '>
                                        <input checked={myfilters[e.key]?.indexOf(v)!==-1} onChange={(event)=>filterhandler(event.target.value,e?.key)} value={v} type='checkbox'/>
                                        <p>{v}</p>
                                    </div>
                                })
                            }
                        </div>
                </div>
            })
         }
        </div>

   </div>
  )
}

export default Filter