"use client"; // This directive ensures the component runs only on the client side in a Next.js app.
// Install @stripe/stripe-js & @stripe/react-stripe-js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/app/checkout/action";
import { useCart } from "@/context/context";


// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
    const {cart} = useCart()
  // State to store the client secret, which is required for processing the payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );
  useEffect(() => {
    // When the component mounts, request a new PaymentIntent from the server
    createPaymentIntent(totalAmount) // Pass the total amount to the server
      .then((res) => {
          setClientSecret(res.clientSecret); // Save the client secret to state
      })
  }, []);
  console.log(clientSecret);

  // While waiting for the client secret, show a loading message
  if (!clientSecret) {
    return <div className="font-semibold animate-pulse">Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      
      {/* Wrap the payment form inside the Elements provider with Stripe instance and client secret */}
      <Elements stripe={stripePromise} 
      options={{ clientSecret }}>
        <PaymentForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
}

// Component that handles the payment form
interface PaymentFormProps {
  totalAmount: number;
}

function PaymentForm({ totalAmount }: PaymentFormProps) {
    const {cart} = useCart()
  const stripe = useStripe(); // Hook to access Stripe methods
  const elements = useElements(); // Hook to access Stripe elements
  const [isProcessing, setIsProcessing] = useState(false); // State to manage loading state while processing
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to show error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh when submitting the form

    if (!stripe || !elements) return; // Ensure Stripe is loaded before proceeding

    setIsProcessing(true); // Indicate that the payment is being processed

    // Attempt to confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Redirect if required by the payment method
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred"); // Display error message if payment fails
      setIsProcessing(false);
    } else {
      // Payment was successful
      setErrorMessage(null);
      alert("Payment successful!"); // Notify the user
      setIsProcessing(false);
      // You can optionally redirect the user to a success page here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe's payment element (handles input fields for card details, etc.) */}
      <PaymentElement />
      <div className="block md:hidden my-4 max-w-[250px] md:max-w-[650px] mx-auto">
    <div className="border p-4 rounded-md shadow-sm    mb-6">
             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map((item) => (
          <div key={item._id} className="flex justify-between md:gap-10 lg:gap-20 mb-3">
            <span className="text-[9px]  font-semibold">{item.name} (x{item.quantity})</span>
            <span className="text-[#48a02d] text-[9px]">₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span >₹{totalAmount}</span>
        </div>
      </div>
    </div>
      <button type="submit" 
      className="bg-black text-white items-center md:mt-6 justify-center w-full py-2 rounded-md"
      disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"} {/* Show dynamic button text */}
      </button>
      {/* Display any error messages if they occur */}
      {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
    </form>
  );
}