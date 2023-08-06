import Otp from "@/modals/otp";
import User from "@/modals/user";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import otpgenerator from "otp-generator";
type body={
    upperCase:boolean,
    specialChars:boolean,
    lowerCaseAlphabets:boolean,
    upperCaseAlphabets:boolean,
    digits:boolean
}
export async function POST(req: NextRequest) {
    try{
       const {email}=await req.json();
         if(!email){
            return NextResponse.json({
                Success:false,
                Message:"Email required"
            },{status:404})
        }
        
            const dbconnect=await connectdb();
            if(!dbconnect){
                return NextResponse.json({
                    Success:false,
                    Message:"Db connection error"
                },{status:500})
            }
            const useefound=await User.findOne({email:email})
            if(useefound){
                return NextResponse.json({
                    Success:false,
                    Message:"User already exists"
                },{status:404})
            }
            const options:body={
                upperCase:false,
                specialChars:false,
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                digits:true
            }
            const newotp=otpgenerator.generate(6,options)
            await Otp.create({email:email,otp:newotp})
         
            
            return NextResponse.json({
                Success:true,
                Message:"Otp sent successfully"
            },{status:200})
    }catch(err){
        console.log("Error while sending otp","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while sending otp"
        },{status:500})
    }
}