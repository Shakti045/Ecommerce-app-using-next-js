import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/config/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(
  req:NextRequest
) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product:any) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: 'INR',
        product_data: {
          name: product.productname,
          images: [product.productimage]
        },
        unit_amount: product.sellprice * 100
      }
    });
  });

  
  const session= await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_STRIPE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_URL}/payment/cancel`,
    metadata: {
      orderId: '123456789',
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};