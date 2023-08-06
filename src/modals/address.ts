import mongoose from "mongoose";
const Addressschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

            fullname: {
                type: String,
                required: true,
                trim: true
            },
            mobilenumber: {
                type: String,
                required: true,
                trim: true
            },
            pincode: {
                type: String,
                required: true,
                trim: true
            },
            customaddress:{
                type:String,
                required:true,
                trim:true
            },
            district: {
                type: String,
                required: true,
                trim: true
            },
            state: {
                type: String,
                required: true,
                trim: true
            },
            type: {
                type: String,
                required: true,
                trim: true
            },
            locality: {
                type: String,
                required: true,
                trim: true
            },
            alternatenumber
            : {
                type: String,
                trim: true
            },
            landmark: {
                type: String,
                trim: true
            },
            defaultaddress:{
                type:Boolean,
                required:true,
                default:false
            }
});

export default mongoose.models.Address || mongoose.model("Address", Addressschema);