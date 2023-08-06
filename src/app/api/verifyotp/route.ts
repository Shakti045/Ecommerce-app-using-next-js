import Otp from "@/modals/otp";
import { NextRequest,NextResponse } from "next/server"
import { connectdb } from "@/config/dbconnect"
import jwt from "jsonwebtoken";
export async function POST(req:NextRequest){
   try{
     const dbconnect=await connectdb();
     if(!dbconnect){
        return NextResponse.json({
            Success:false,
            Message:'Db connection error'
        }),{status:500}
     }
     const {email,otp}=await req.json();
     if(!email || !otp ){
        const jsonbody={
            Success:false,
            Message:"All fields required"
        }
        return new NextResponse(JSON.stringify(jsonbody),{status:404})
     }

     const userotp=await Otp.find({email:email}).sort({createdat:-1})
     
     
     if(userotp[0].otp!==otp){
        return NextResponse.json({
            Success:false,
            Message:"Invalid otp"
        },{status:400})
     }
     const payload={
        email:email
     }
     const token=jwt.sign(payload,process.env.JWT_SECRET_KEY!);
          return NextResponse.json({
            Success:true,
            Message:"Email id verified",
            token:token
        },{status:200})
   }catch(err){
     console.log("Error while creating user","=>",err);
     return NextResponse.json({
        Success:false,
        Message:"Internal server error"
        },{status:500})  
   }
}