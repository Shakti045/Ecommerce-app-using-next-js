import Address from "@/modals/address";
import { NextRequest,NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { getuserfromtoken } from "@/utils/apimiddleware";
import User from "@/modals/user";
export async function POST(req:NextRequest){
    try{
         const user=await getuserfromtoken(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    message:"User not found"
                },{status:404})
            }
            const {fullname,customaddress,alternatenumber,district,landmark,locality,pincode,state,type,mobilenumber}=await req.json();
            console.log(fullname,customaddress,alternatenumber,district,landmark,locality,pincode,state,type,mobilenumber);
            if(!fullname || !mobilenumber || !pincode || !customaddress || !district || !state || !type || !locality){
                return NextResponse.json({
                    Success:false,
                    message:"Please fill all the fields"
                },{status:400})
            }

            const oldadress=await Address.find({user:user.id});
            const addressexists=oldadress.find((address)=>
                address.fullname===fullname &&
                address.mobilenumber===mobilenumber &&
                address.pincode===pincode &&
                address.district===district &&
                address.state===state &&
                address.type===type &&
                address.locality===locality &&
                address.customaddress===customaddress &&
                address.alternatenumber===alternatenumber &&
                address.landmark===landmark
                );
            if(addressexists){
                return NextResponse.json({
                    Success:false,
                    message:"Address already exists"
                },{status:400})
            }
            const address=await Address.create({
                user:user.id,
                fullname,
                mobilenumber,
                pincode,
                district,
                state,
                type,
                locality,
                customaddress,
                alternatenumber:alternatenumber?alternatenumber:"",
                landmark:landmark?landmark:""
            });

            await User.findByIdAndUpdate(user.id,{$push:{addresses:address._id}})
            if(!address){
                return NextResponse.json({
                    Success:false,
                    message:"Something went wrong"
                },{status:500})
            }
            return NextResponse.json({
                Success:true,
                message:"Address added successfully",
                data:address
            },{status:200})
    }catch(err){
        console.log("Something went wrong in address route","=>",err);
        return NextResponse.json({
            Success:false,
            message:"Something went wrong"
        },{status:500})
    }
}


export async function GET(req:NextRequest){
    try{
      const user=await getuserfromtoken(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                message:"User not found"
            },{status:404})
        }
        await connectdb();
        const address=await Address.find({user:user.id});
        if(!address){
            return NextResponse.json({
                Success:false,
                message:"Something went wrong"
            },{status:500})
        }
        return NextResponse.json({
            Success:true,
            message:"Address fetched successfully",
            data:address
        },{status:200})
    }catch(err){
        console.log("Something went wrong in address route","=>",err);
        return NextResponse.json({
            Success:false,
            message:"Something went wrong"
        },{status:500})
    }
}


export async function PUT(req:NextRequest){
    try{
       const user=await getuserfromtoken(req);
        if(!user){
               
            return NextResponse.json({
                Success:false,
                message:"User not found"
            },{status:404})
        }
        const {adressid,fullname,customaddress,alternatenumber,district,landmark,locality,pincode,state,type,mobilenumber}=await req.json();
        if(!adressid && !fullname && !customaddress && !alternatenumber && !district && !landmark && !locality && !pincode && !state && !type && !mobilenumber){
            return NextResponse.json({
                Success:false,
                message:"Please fill atleast onefield"
            },{status:400})
        }
        const tobeupdated:any={};
        if(fullname){
            tobeupdated.fullname=fullname;
        }
        if(mobilenumber){
            tobeupdated.mobilenumber=mobilenumber;
        }
        if(pincode){
            tobeupdated.pincode=pincode;
        }
        if(district){
            tobeupdated.district=district;
        }
        if(state){
            tobeupdated.state=state;
        }
        if(type){
            tobeupdated.type=type;
        }
        if(locality){
            tobeupdated.locality=locality;
        }
        if(customaddress){
            tobeupdated.customaddress=customaddress;
        }
        if(alternatenumber){
            tobeupdated.alternatenumber=alternatenumber;
        }
        if(landmark){
            tobeupdated.landmark=landmark;
        }

        const updatedadress=await Address.findByIdAndUpdate(adressid,tobeupdated,{new:true});
        if(!updatedadress){
            return NextResponse.json({
                Success:false,
                message:"Something went wrong"
            },{status:500})
        }
        return NextResponse.json({
            Success:true,
            message:"Address updated successfully",
            data:updatedadress
        },{status:200})

    }catch(err){
        console.log("Something went wrong in address route","=>",err);
        return NextResponse.json({
            Success:false,
            message:"Something went wrong"
        },{status:500})
    }
}