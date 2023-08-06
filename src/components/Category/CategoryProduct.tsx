'use client'
import CategoryProductCard from "./CategoryProductCard"
import Link from "next/link"
const CategoryProduct = ({products,bestselling}:{products:any,bestselling:any}) => {
    console.log(products)
  return (
    <div className=' h-full  overflow-y-scroll p-3 rounded-md bg-white w-[79%]'>
        {
            products.length>0?(<>
             {
            products.map((p:any,index:number)=>{
                return <Link key={index} href={`/product/${p._id}`}>
                 <CategoryProductCard bestselling={bestselling}  key={index} {...p}/>
                </Link>
            })
        }
            </>):(<div className="  w-full h-full flex justify-center items-center">
                <h1 className=" text-3xl opacity-70">No Product Found</h1>
            </div>)
        }
    </div>
  )
}

export default CategoryProduct