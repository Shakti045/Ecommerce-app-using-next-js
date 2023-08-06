import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const getuserfromtoken=async(req:NextRequest)=>{
     try{
        let token=req.cookies.get("ecommercetoken")?.value || req.headers.get("Authorization")?.replace("Bearer ","");
        if(token){
            const decodedtoken:any=jwt.verify(token,process.env.JWT_SECRET_KEY!);
            return decodedtoken;
        }
        return null;
     }catch(err){
        console.log("Error while fetching data from token","=>",err);
      
     }
}


