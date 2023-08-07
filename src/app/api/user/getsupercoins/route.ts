import { NextRequest,NextResponse } from "next/server";
import { getuserfromtoken } from "@/utils/apimiddleware";
import { connectdb } from "@/config/dbconnect";
import User from "@/modals/user"
export async function GET(req: NextRequest) {
  try{
     const user:any=await getuserfromtoken(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"User not found"
            },{status:404})
        }
        await connectdb();
        const userfromdb=await User.findById(user.id)
        console.log(userfromdb);
        if(!userfromdb){
            return NextResponse.json({
                Success:false,
                Message:"User not found db"
            },{status:404})
        }
        return NextResponse.json({
            Success:true,
            Message:"User found",
            Data:userfromdb.supercoins
        },{status:200})
   }catch(e){
     console.log(e);
   }   
}
