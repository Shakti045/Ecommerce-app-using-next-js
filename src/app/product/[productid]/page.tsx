'use client'
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { producturl } from "@/services/externalurl"
import Loader from "@/components/Common/Loader"
import Productpage from "@/components/product/Productpage"
import axios from "axios"

const page = () => {
    const {productid}=useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>();
    async function getproduct(){
        try{
          const result=await axios.get(producturl.getproductdetail+`/${productid}`);
           if(result.status===200){
            console.log(result.data.Product)
               setProduct(result.data.Product)
           }
        }catch(err:any){
            console.log("Error in getproduct",err)
        }finally{
            setLoading(false)
    }
    }
    useEffect(() => {
        getproduct();
    }, [productid])
  return (
      <>
         {
            loading?<Loader/>:<div className=" bg-white w-full p-6 pb-0 h-[calc(100vh-3.5rem)]">
                 <Productpage {...product}/>
                </div>
         }

      </>
  )
}

export default page;