import mongoose from "mongoose"
import { sendMail } from "@/utils/email"
import {otpTemplate} from "@/assets/templates/otptemplate"
const Otpschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdat:{
        type:Date,
        required:true,
        default:Date.now(),
        expires:300
    }
})

Otpschema.post("save",async (doc:any)=>{
    try{
        await sendMail(doc.email,"Otp for verification",otpTemplate(doc.otp))
    }catch(err){
       console.log("Error while sending otp","=>",err);
       
    }
})

export default mongoose.models.Otp ||  mongoose.model("Otp",Otpschema);