import { NextRequest,NextResponse } from "next/server";
export async function GET(req:NextRequest){
    try{
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("ecommercetoken", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response;
    }catch(err){
     return NextResponse.json({
        Success:false,
        Message:"Something went wrong"
     },{status:500})
    }
}