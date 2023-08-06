import React from 'react'

const Specifications = ({attributes}:{attributes:any}) => {
    const keyarray=Object.keys(attributes);
  return (
    <div className=' flex flex-col gap-2 mt-4'>
        <h1 className=' text-lg font-bold'>Product Specifications</h1>
         <div>
             {
                keyarray.map((e:string,index:number)=>{
                    return <div key={index} className=' flex gap-4 w-[300px] justify-between '>
                        <p className=' opacity-70'>{e}</p>
                        <p className=''>{attributes[e]}</p>
                    </div>
                })
             }
         </div>
    </div>
  )
}

export default Specifications