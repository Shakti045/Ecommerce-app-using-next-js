import User from "@/modals/user";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { getuserfromtoken } from "@/utils/apimiddleware";
import crypto from "crypto";
import OrderHistory from "@/modals/orderhistory";
import axios from "axios";
import { createorderinsellersideurl } from "@/services/externalurl";
async function createorderhistory(user:any,products:any,paymentid:any,
    supercoinsused:any,supercoinsearned:any,totalprice:any
    ,deliveryaddress:any){
      products=products.map((product:any)=>{
        return {...product,status:"Pending",lastupdatedon:Date.now()}
      })
    const orderhistory=await OrderHistory.create({
        user:user.id,
        products:products,
        paymentid:paymentid,
        supercoinsused:supercoinsused,
        supercoinsearned:supercoinsearned,
        deliveryaddress:deliveryaddress,
        totalpayment:totalprice
    })
    return orderhistory;
}

     

export async function POST(req:NextRequest){
    try{
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature,products,address,supercoinsused,supercoinsearned,totalamount}=await req.json();
        if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !products || !address  || !totalamount ){
            return NextResponse.json({
                Success:false,
                message:"Invalid request"
            },{status:400})
        }
        const user=await getuserfromtoken(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                message:"User not found"
            },{status:404})
        }
      await connectdb();
      let body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAYKEY_SECRET!)
          .update(body.toString())
          .digest("hex");
        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({
                Success:false,
                message:"Unauthorized payment request"
            },{status:400})

        }
        const myuser=await User.findById(user.id);
        if(!myuser){
            return NextResponse.json({
                Success:false,
                message:"Something went wrong while creating order"
            },{status:500})
        }

        
     

   
        let sellerdata=[];
        for(let i=0;i<products.length;i++){
            const currentproduct=products[i];
            currentproduct.supercoinsearned=(Math.floor(currentproduct.sellprice*0.02)>=200?200:Math.floor(currentproduct.sellprice*0.02))*currentproduct.quantity;
            const supercoinsusedinthis=Math.floor(((supercoinsused/100)/(totalamount/100))*currentproduct.sellprice*currentproduct.quantity);
            currentproduct.supercoinsused=supercoinsusedinthis;
            sellerdata.push({
                sellerid:currentproduct.seller._id,
                selllprice:currentproduct.sellprice,
                originalprice:currentproduct.originalprice,
                productid:currentproduct._id,
                quantity:currentproduct.quantity,
                deliveryadress:address,
                customeremail:myuser.email,
                customername:myuser.firstname+" "+myuser.lastname,
                
            })
    
        }
         
        const orderhistory=await createorderhistory(user,products,
            razorpay_payment_id,supercoinsused,supercoinsearned,totalamount,address);
        if(!orderhistory){
            return NextResponse.json({
                Success:false,
                message:"Something went wrong while creating order"
            },{status:500})
        }

        sellerdata=sellerdata.map((data:any)=>{
            return {...data,clientorderid:orderhistory._id}
        })

        const responce=await axios.post(createorderinsellersideurl,{data:sellerdata});
        if(!responce.data.Success){
            return NextResponse.json({
                Success:false,
                message:"Something went wrong while creating order"
            },{status:500})
        }
        return NextResponse.json({
            Success:true,
            message:"Order created successfully",
            supercoinsearned:supercoinsearned
        },{status:200})
    }catch(err){
        console.log("Something went wrong in verifypayment route","=>",err);
        return NextResponse.json({
            Success:false,
            message:"Something went wrong while verifying payment"
        },{status:500})
    }
}
