import User from "@/modals/user";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { getuserfromtoken } from "@/utils/apimiddleware";
export async function POST(req:NextRequest){
   try{
       const {firstname,lastname,email,gender,profilephoto}=await req.json();3
        if(!firstname && !lastname && !email && !gender && !profilephoto){
            return NextResponse.json({
                Success:false,
                Message:"Please give atleast one  field"
            },{status:400})
        }
         const user=await getuserfromtoken(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"User not found"
                },{status:404})
            }

         await connectdb();
         let tobeupdate={};
            if(firstname){
                tobeupdate={...tobeupdate,firstname}
            }
            if(lastname){
                tobeupdate={...tobeupdate,lastname}
            }
            if(email){
                tobeupdate={...tobeupdate,email}
            }
            if(profilephoto){
                tobeupdate={...tobeupdate,profilephoto}
            }
            if(gender){
                tobeupdate={...tobeupdate,gender}
            }
            const updateduser=await User.findByIdAndUpdate(user.id,tobeupdate,{new:true});
            return NextResponse.json({
                Success:true,
                Message:"User updated successfully",
                user:updateduser
            },{status:200})
   }catch(err){
       console.log(err);
       return NextResponse.json({
        Success:false,
        Message:"Something went wrong"
       },{status:500})
   }
}