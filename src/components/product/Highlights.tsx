import React from 'react'
import {BsDot} from "react-icons/bs"
const Highlights = ({highlights}:{highlights:any}) => {
  return (
    <div className=' flex gap-4 mt-5'>
        <h1 className=' font-bold text-lg'>Highlights</h1>
        <div className=' flex flex-col gap-2'>
            {
                highlights.map((e:string,i:number)=>{
                    return <div key={i} className=' flex gap-2 '>
                        <BsDot/>
                        <p>{e}</p>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Highlights