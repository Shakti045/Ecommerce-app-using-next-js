import axios from "axios";
import { instance } from "@/config/razorpay";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";3
import { getuserfromtoken } from "@/utils/apimiddleware";
import { producturl } from "@/services/externalurl";
import User from "@/modals/user";
import Address from "@/modals/address";
export async function POST(req:NextRequest){
    try{
       const {products,address,supercoinsused}=await req.json();
       console.log(products,address,supercoinsused)
       if(!products || !address  || products?.length===0){
              return NextResponse.json({
                Success:false,
                Message:"Invalid Request"
              },{status:400})
         }
            const user=await getuserfromtoken(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"Unauthorised request"
                },{status:400})
            }
          await connectdb();
          const productsid=products.map((product:any)=>product._id);
         const productsfromsller=await axios.post(producturl.getproductsbyid,{productsid:productsid});
         const productsfromsllerdata=productsfromsller?.data?.Products;
            if(!productsfromsllerdata || productsfromsllerdata?.length===0){
                return NextResponse.json({
                    Success:false,
                    Message:"No Products Found"
                },{status:400})
            }
        let totalamount=0;
        let totaldiscount=0;
        let totalquantity=0;
        let supercoinsearned=0;
        for(const product of productsfromsllerdata){
            if(product?.numberofproducts ===0){
                return NextResponse.json({
                    Success:false,
                    Message:`${product?.
                        productname} is out of stock`
                },{status:400})
            }
            const productfromuser=products.find((productfromuser:any)=>productfromuser._id===product._id);
            if(productfromuser?.quantity > product?.numberofproducts){
                return NextResponse.json({
                    Success:false,
                    Message:`${product?.
                        productname} has only ${product?.numberofproducts} left`
                },{status:400})
            }
            totalamount+=productfromuser?.quantity * product?.sellprice;
            // totalquantity+=productfromuser?.quantity;
            // totaldiscount+=productfromuser?.quantity * (product?.originalprice - product?.sellprice);  
            supercoinsearned+=Math.floor((productfromuser?.quantity * product?.sellprice * 2)/100)<=200?Math.floor((productfromuser?.quantity * product?.sellprice * 2)/100):200;
        }
        const buyer=await User.findById(user.id,{supercoins:1,addresses:1});
        console.log(buyer)
        if(!buyer){
            return NextResponse.json({
                Success:false,
                Message:"User not found"
            },{status:400})
        }
        const buyesraddress=await Address.findById(address,{user:-1});
        if(!buyesraddress){
            return NextResponse.json({
                Success:false,
                Message:"Address not found"
            },{status:400})
        }
        let supercoinsusedfromuser=0;
        if(supercoinsused){
            supercoinsusedfromuser=buyer.supercoins>totalamount?totalamount:buyer.supercoins;
            totalamount-=buyer.supercoins;
           
        }
        const currency="INR"
        const instanceresponce=await instance.orders.create({
          amount: `${totalamount>0?totalamount*100:100}`,
          currency,
          receipt: `${Date.now().toString()}`,
        })
        if(!instanceresponce){
            return NextResponse.json({
                Success:false,
                Message:"Something went wrong"
            },{status:500})
        }
        return NextResponse.json({
            Success:true,
            Message:"Payment captured successfully",
            data:{
                orderid:instanceresponce.id,
                amount:instanceresponce.amount,
                currency:instanceresponce.currency,
                address:buyesraddress,
                supercoinsearned:supercoinsearned,
                supercoinsused:supercoinsusedfromuser
            }
        },{status:200})
    }catch(err){
        console.log("Error in capturepayment route:","=>",err)
        return NextResponse.json({
            Success:false,
            Message:"Server Error While Capturing Payment"
        },{status:500})
    }
}





