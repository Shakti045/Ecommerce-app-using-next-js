'use client'
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import noresult from "@/assets/images/error-no-search-results_2353c5.png"
import Image from "next/image"
import Loader from "@/components/Common/Loader"
import axios from "axios"
import Singleproduct from "@/components/Home/Singleproduct"
import { producturl } from "@/services/externalurl"
const page = () => {
    const [loading, setLoading] = useState(true);
     const [products, setProducts] = useState<any[]>([]);
    let {keyword}:any=useParams();
    async function getproducts(){
        keyword=keyword.replace(/%20/g," ");
        try{
            const result=await axios.post(producturl.getsearchproducts,{keyword:keyword});
            if(result.status===200){
                setProducts(result.data.Products);
            }
        }catch(err){
            console.log("Error while fetching data","=>",err);
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getproducts();
    }, [keyword])
  return (
    <div className="  w-full  p-6">
        {
            loading?<Loader/>:<div className=" rounded-md  bg-white w-full p-6 pb-0 h-[calc(100vh-3.5rem)] ">
             {
               products.length===0 && <div className=" flex flex-col gap3 items-center w-full h-full justify-center">
                <Image src={noresult} alt="noresult"/>
                <h1 className=" text-3xl opacity-70">Sorry, no results found!</h1>
                <h1>Please check the spelling or try searching for something else</h1>
               </div>
             }
             {
                    products.length>0 && <div className="  searchpage overflow-y-scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        products.map((product:any,index:number)=>{
                            return <Singleproduct key={index} product={product}/>
                        })
                    }
                    </div>
             }
            </div>
        }
    </div>
  )
}

export default page