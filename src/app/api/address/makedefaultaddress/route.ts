import Address from "@/modals/address";
import { NextRequest,NextResponse } from "next/server";
import { getuserfromtoken } from "@/utils/apimiddleware";
export async function POST(req:NextRequest){
    try{
        const user=await getuserfromtoken(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"User not found"
            },{status:404})
        }
        const {addressid}=await req.json();
        if(!addressid){
            return NextResponse.json({
                Success:false,
                Message:"Address id not found"
            },{status:404})
        }
        const previousdefaultaddress=await Address.findOneAndUpdate({user:user.id,defaultaddress:true},{defaultaddress:false});
        await Address.findByIdAndUpdate(addressid,{defaultaddress:true});
        return NextResponse.json({
            Success:true,
            Message:"Default address updated successfully"
        },{status:200})
    }catch(err){
        console.log("Error while making default address","=>",err)
        return NextResponse.json({
            Success:false,
            Message:"Something went wrong"
        },{status:500})
    }
}