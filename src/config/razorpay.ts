import Razorpay from 'razorpay'
export const instance=new Razorpay({
    key_id:process.env.RAZORPAYKEY_ID!,
    key_secret:process.env.RAZORPAYKEY_SECRET!,
})
