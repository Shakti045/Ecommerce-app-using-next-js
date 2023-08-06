import Address from "@/modals/address";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { getuserfromtoken } from "@/utils/apimiddleware";
import User from "@/modals/user";
export async function DELETE(req: NextRequest) {
    try {
   
        const  addressid  = req.nextUrl.pathname.split("/")[4] ;
    
        if (!addressid) {
            return NextResponse.json({
                Success: false,
                message: "Address id not found"
            }, { status: 404 })
        }
        const user = await getuserfromtoken(req);
        if (!user) {
            return NextResponse.json({
                Success: false,
                message: "User not found"
            }, { status: 404 })
        }
        await connectdb();
        const address = await Address.findByIdAndDelete(addressid);
        await User.findByIdAndUpdate(user.id,{$pull:{addresses:address._id}})
        if (!address) {
            return NextResponse.json({
                Success: false,
                message: "Address not found"
            }, { status: 404 })
        }
        // if (!user) {
        //     return NextResponse.json({
        //         Success: false,
        //         message: "User not found"
        //     }, { status: 404 })
        // }
        return NextResponse.json({
            Success: true,
            message: "Address deleted successfully"
        }, { status: 200 })
    } catch (err) {
        console.log("Something went wrong in address route", "=>", err);
        return NextResponse.json({
            Success: false,
            message: "Something went wrong"
        }, { status: 500 })
    }
}