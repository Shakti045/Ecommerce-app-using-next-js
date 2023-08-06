import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    gender:{
        type:String,
        default:null
    },
    password:{
        type:String,
        required:true
    },
    profilephoto:{
        type:String,
    },
    supercoins:{
        type:Number,
        default:0
    },
    addresses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }]
})

export default mongoose.models.User || mongoose.model("User",Userschema);