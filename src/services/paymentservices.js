'use client'
import { toast } from "react-toastify";
import razpaylogo from "@/assets/images/razorpaylogo.png"
import axios from "axios";
import { set_products } from "@/redux/slices/payment";
import { reset_cart } from "@/redux/slices/cart";
// import { sendMail } from "@/utils/email";
// import { useSelector } from "react-redux";
// const {user}=useSelector(state=>state.auth);


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
    
            script.onload = () => {
                resolve(true);
            }
            script.onerror= () =>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }
    


    
   async function verifyPayment(response,products,address,supercoinsused,supercoinsearned , token, router,totalamount,requestfromcart, dispatch){
    const loadingtoast=toast.loading("Please wait.....")
     try{
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=response;
        const result=await axios.post('/api/payment/verifypayment',{razorpay_payment_id:razorpay_payment_id,razorpay_order_id:razorpay_order_id,razorpay_signature:razorpay_signature,
        products:products,
        address:address,
        supercoinsused:supercoinsused,
        supercoinsearned:supercoinsearned,
        totalamount:totalamount/100
        },{
            headers:{
              Authorization:`Bearer ${token}`
            }
        });
        if(result.status===200){
           toast.success("Product(s) purchased successfully");
           dispatch(set_products([]));
            if(requestfromcart){
              dispatch(reset_cart());
            }
            // await sendMail(user.email,"Order Confirmation ",orderconfirmationtemplate(user.firstname,products,totalamount/100));
            router.push("/dashboard/orders");
        }
     }catch(err){
        console.log("Error while verifying signature","=>",err);
        toast.dark("Error occured")
        toast.error(err.response.data.message);
     }
     toast.dismiss(loadingtoast);
   }






export const capturepayment=async(products,address,supercoinsused,token,userDetails,router,requestfromcart,dispatch)=>{
  const loadingtoast=toast.loading("Please wait.....")
  try{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if(!res) {
        toast.error("RazorPay SDK failed to load");
        return false;
    }

    const orderResponse=await axios.post("/api/payment/capturepayment",{
        products,
        address,
        supercoinsused
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    // console.log(orderResponse);
    if(!orderResponse){
        toast.error("Payment initiation failed")
        return false;
    }

    const options = {
        key: process.env.RAZORPAYKEY_ID_CLIENT,
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id:orderResponse.data.data.orderid,
        name:"Flipkart Clone",
        description: "Thank you for shopping with us",
        image:razpaylogo,
        prefill: {
            name:`${userDetails.firstname}`,
            email:userDetails.email
        },
        handler: function(response) {
            verifyPayment(response,products,address,orderResponse.data.data.supercoinsused,orderResponse.data.data.supercoinsearned , token, router,orderResponse.data.data.amount,requestfromcart, dispatch);
        }
    }

   const paymentObject =  new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
        toast.error("oops, payment failed");
        console.log(response.error);
    })

  }catch(err){
    console.log("Error while capturing payment","=>",err);
    toast.error(err.response.data.Message)
  }

  toast.dismiss(loadingtoast);
}