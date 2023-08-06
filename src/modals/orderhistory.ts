import mongoose from "mongoose";
const orderhistoryschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

          },
             products:[
                  
                 {
                    type:Map,
                    
                 }  
               ],
            
            paymentid:{
                type:String,
                required:true
            },
           supercoinsearned:{
                type:Number,
           },
           deliveryaddress:{
                 type:Map,
                 required:true
           },
           supercoinsused:{
                type:Number,
               
              },
              totalpayment:{
                type:Number
              },
                createdAt:{
                type:Date,
                required:true,
               default:new Date(Date.now())
              
           }   
    })

    export default mongoose.models.OrderHistory || mongoose.model("OrderHistory",orderhistoryschema);