'use client'
import Singleproduct from "./Singleproduct"
interface product{
    _id:number,
    productname:string,
    productimages:Array<string>,
    sellprice:number,
    originalprice:number,
    discount:number
}

const Productcard = ({products}:{products:Array<product>}) => {
  return (
    <div className=" h-fit  w-full flex items-stretch justify-between flex-wrap  ">
        {
            products.splice(0,5).map((product:any,index)=>{
                return <Singleproduct key={index} product={...product}/>
            })
        }
        
    </div>
  )
}

export default Productcard;