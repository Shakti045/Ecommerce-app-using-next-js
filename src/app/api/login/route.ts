import User from "@/modals/user";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
    try{
       const dbconnect=await connectdb();
         if(!dbconnect){
            return NextResponse.json({
                Success:false,
                Message:'Db connection error'
            },{status:500})
         }
            const {email,password}=await req.json();
            if(!email || !password){
                return NextResponse.json({
                    Success:false,
                    Message:"All fields required"
                },{status:404})
            }
            const userfound=await User.findOne({email:email})
            if(!userfound){
                return NextResponse.json({
                    Success:false,
                    Message:"User not found"
                },{status:400})
            }
            const ispasswordvalid=await bcrypt.compare(password,userfound.password);
            if(!ispasswordvalid){
                return NextResponse.json({
                    Success:false,
                    Message:"Invalid password"
                },{status:400})
            }
            const payload={
                id:userfound._id,
                email:userfound.email,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})
            const responce=NextResponse.json({
                Success:true,
                Message:"Login successfull",
                token:token,
                user:userfound
            })
            responce.cookies.set("ecommercetoken",token,{httpOnly:true,secure:true})
            return responce;
        }catch(err){
        console.log("Error while login the user","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Internal server error"
        },{status:500})  
    }
}