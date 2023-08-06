import Orderhistory from "@/modals/orderhistory";
import { connectdb } from "@/config/dbconnect";
import { getuserfromtoken } from "@/utils/apimiddleware";
import { NextRequest,NextResponse } from "next/server"; 
import User from "@/modals/user";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(req:NextRequest){
    try{
       await connectdb();
       const {orderid,productid,status}=await req.json()
       if(!orderid || !productid || !status){
           return NextResponse.json({
               Success:false,
               Message:"Invalid request"
           },{status:400})
       }
    //    const orderhistory=await Orderhistory.findOne({_id:orderid});   
      const orderhistory= await Orderhistory.findOneAndUpdate({
        "_id": orderid,
        "products._id": productid,
      },
      {
        $set: {
          "products.$.status": status,
          "products.$.lastupdatedon": new Date().toISOString(),
        }
      })

         if(!orderhistory){
                return NextResponse.json({
                    Success:false,
                    Message:"Invalid request"
                },{status:400})
         }
          if(status==="delivered"){
            const product=orderhistory.products.find((product:any)=>product.get('_id')==productid);
            await User.findOneAndUpdate({_id:orderhistory.user},{$inc:{
              supercoins:product.get('supercoinsearned')}})
          }



         return NextResponse.json({
            Success:true,
            Message:"Order status updated successfully"
        },{status:200})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
        },{status:500})
    }
}






export async function GET(req:NextRequest){
    try{
        const user=await getuserfromtoken(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"Unauthorised request"
            },{status:400})
        }
        await connectdb();
        const orders=await Orderhistory.find({user:user.id},{products:1}).sort({
            createdAt:1});
        return NextResponse.json({
            Success:true,
            Message:"Orders fetched successfully",
            Orders:orders
        },{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
        },{status:500})
    }
}   


