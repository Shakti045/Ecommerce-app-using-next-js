import User from "@/modals/user"
import { NextRequest,NextResponse } from "next/server"
import { connectdb } from "@/config/dbconnect"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function POST(req:NextRequest){
   try{
     const dbconnect=await connectdb();
     if(!dbconnect){
        return NextResponse.json({
            Success:false,
            Message:'Db connection error'
        }),{status:500}
     }
     const {email,firstname,lastname,mailtoken,password}=await req.json();
     if(!email || !firstname || !lastname || !mailtoken || !password){
        return NextResponse.json({
            Success:false,
            Message:"All fields required"
        },{status:404})
     }
     const mailverified:any=jwt.verify(mailtoken,process.env.JWT_SECRET_KEY!)
     if(mailverified.email!==email){
        console.log(mailverified);
        
      return NextResponse.json({
         Success:false,
         Message:"Kindly give the verified mail"
      },{status:404})
     }
     const userfound=await User.findOne({email:email})
     if(userfound){
        return NextResponse.json({
            Success:false,
            Message:"User already exists"
        },{status:400})
     }
     
     const newpassword=await bcrypt.hash(password,10);
     const profilephoto=`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random&length=2&size=128&width=128`
     await User.create({firstname:firstname,lastname:lastname,email:email,password:newpassword,profilephoto:profilephoto})
        return NextResponse.json({
            Success:true,
            Message:"User created successfully"
        },{status:200})
   }catch(err){
     console.log("Error while creating user","=>",err);
     return NextResponse.json({
        Success:false,
        Message:"Internal server error"
        },{status:500})  
   }
}