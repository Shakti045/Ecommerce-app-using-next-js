import { connectdb } from "@/config/dbconnect";
import { NextRequest,NextResponse } from "next/server";
import { getuserfromtoken } from "@/utils/apimiddleware";
import Orderhistory from "@/modals/orderhistory";
import axios from "axios";
import { orderurl } from "@/services/externalurl";
import User from "@/modals/user";
export async function GET(req:NextRequest){
    try{
      const orderid=req.nextUrl.pathname.split("/")[3];
      if(!orderid){
          return NextResponse.json({
              Success:false,
              Message:"Invalid request"
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
        const order=await Orderhistory.findOne({_id:orderid,user:user.id})
        if(!order){
            return NextResponse.json({
                Success:false,
                Message:"Invalid request"
            },{status:400})
        }
        return NextResponse.json({
            Success:true,
            Message:"Order fetched successfully",
            Order:order
        },{status:200})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
        },{status:500})
    }
}


export async function PUT(req:NextRequest){
    try{
        const orderid=req.nextUrl.pathname.split("/")[3];
        const {productid}=await req.json();
        if(!orderid || !productid){
            return NextResponse.json({
                Success:false,
                Message:"Invalid request"
            },{status:400})
        }
            const user=await getuserfromtoken(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"Unauthorised request"
                },{status:400})
            }
            const result=await axios.post(orderurl.deleteorder,{orderid,productid})
            console.log(result.data)
            if(!result.data.Success){
                return NextResponse.json({
                    Success:false,
                    Message:"Something went wrong"
                },{status:500})
            }

            await connectdb();
            const orderhistory=await Orderhistory.findOneAndUpdate({
                "_id": orderid,
                "products._id": productid,
              },
              {
                $set: {
                  "products.$.status": "cancelled",
                  "products.$.lastupdatedon": new Date().toISOString(),
                }
              })
            
             
             const deleteditem=orderhistory.products.find((item:any)=>item.get('_id')===productid);
             await User.updateOne({_id:user.id},{$inc:{supercoins:(deleteditem.get('supercoinsused'))}})
            return NextResponse.json({
                Success:true,
                Message:"Order deleted successfully"
            },{status:200})
            
          }catch(err){
            console.log(err)
            return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
          },{status:500})
    }
}
