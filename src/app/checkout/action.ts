"use server";


import Stripe from "stripe";

export async function createPaymentIntent(totalAmount:number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia", // or the latest stable version
  });
  try {
    
    // You can hardcode an amount here, e.g. $20 = 2000 in cents
    const amount = totalAmount ; // USD 20.00

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      // Optionally, you can add metadata or other parameters
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    // In a real app, you should handle the error properly
    console.error(error);
    throw error;
  }
}