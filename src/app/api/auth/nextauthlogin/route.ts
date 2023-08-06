import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import {  NextResponse } from 'next/server'
import { connectdb } from '@/config/dbconnect'
import User from "@/modals/user"
import jwt from "jsonwebtoken";

export async function GET() {
    try{
        await connectdb();
        const session:any = await getServerSession( authOptions )
        const email=session.user?.email
        const user:any=await User.findOne({email:email});
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"You Have No Acoount With Us"
            },{status:500})
        }
        const payload={
            id:user._id,
            email:user.email,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})
        const responce=NextResponse.json({
            Success:true,
            Message:"Login successfull",
            token:token,
            user:user
        })
        responce.cookies.set("ecommercetoken",token,{httpOnly:true,secure:true})
        return responce;
    }catch(err){
        console.log("Error while login the user","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Internal server error"
        },{status:500} ) 
    }
}