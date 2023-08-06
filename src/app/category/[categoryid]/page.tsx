'use client'
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Common/Loader";
import { useState } from "react";
import axios from "axios";
import CategoryProduct from "@/components/Category/CategoryProduct";
import Filter from "@/components/Category/Filter";
import { categoryurl } from "@/services/externalurl";
import { toast } from "react-toastify";
const page = () => {
    const {categoryid}=useParams();
    const [loading,setLoading]=useState(true);
    const [products,setProducts]=useState<any[]>([]);
    const [filters,setFilters]=useState<any[]>([]);
    const [bestseller,setBestseller]=useState<any[]>([]);
    async function getdata(){
        try{
            const result=await axios.post(categoryurl.getcategoryproducts,{categoryid:categoryid});
            if(result.status===200){
                
                setFilters(result.data.Filters?.attributesrequired);
                setProducts(result.data.Products);
                const bestsellingarray=result.data.BestSellingProducts.map((e:any)=>{
                    return e._id
                })
                setBestseller(bestsellingarray);
            }
        }catch(err){
            console.log("Error while fetching data","=>",err);
        }finally{
            setLoading(false)
        }
    }
    
    async function getfiltereddata(data:any){
        const loadingtoast=toast.loading("Please wait......");
        try{
            const result=await axios.post(categoryurl.getfilterproducts,{categoryid:categoryid,filters:data});
            if(result.status===200){
                setProducts(result.data.Products);
            }
        }catch(err){
            console.log("Error while fetching data","=>",err);
        }finally{
         toast.dismiss(loadingtoast);
        }

    }

    async function resetfilter(){
        const loadingtoast=toast.loading("Please wait......");
        try{
            const result=await axios.post(categoryurl.getcategoryproducts,{categoryid:categoryid});
            if(result.status===200){
                setProducts(result.data.Products);
            }
        }catch(err){
            console.log("Error while fetching data","=>",err);
        }finally{
            toast.dismiss(loadingtoast);
        }
    }

    useEffect(()=>{
        getdata();
    },[])

  return (
    <div className=" w-full h-[calc(100vh-3.5rem)]    flex flex-col items-center justify-center">
        {
            loading?(<Loader/>):(
                <div className="   p-4 pb-0 flex  w-full h-full justify-between ">
                     <Filter resetfilter={resetfilter} getfiltereddata={getfiltereddata}  filters={filters}/>
                     <CategoryProduct bestselling={bestseller} products={products}/>
                </div>
            )
        }
    </div>
  )
}

export default page