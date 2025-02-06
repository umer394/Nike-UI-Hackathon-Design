
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Address, Rate, trackingObjType } from "@/components/data/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { cartProductsWhichCanBeShipped } from "@/components/data/data";
import Link from "next/link";
import { useCart } from "@/context/context";
import { useRouter } from "next/navigation";
import CheckoutPage from "@/components/Payment";


export default function Page(){
  const {cart} = useCart()
  const router = useRouter();
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name:"",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no", // 'no' means a commercial address
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setrateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  
  
    // Agar cart empty hai to wapas cart page bhej do
    useEffect(() => {
      if (cart.length === 0) {
        router.push("/cart");
      }
    }, [cart, router]);
  
    // Cart ka total amount calculate karna
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0
    ).toFixed(2);

  // Function to handle form submission of shipping rates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipeToAddress,
        // map the cart products which can be shipped and use only weight and dimensions
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      // see the response in browser
    //   if(!response.data){
        console.log(response.data);
    //     alert("Something issue")
    //   }
      
      // Update the state with the fetched rates
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while fetching rates."]);
      alert("Pleace check your internet connection")
    } finally {
      setLoading(false);
      
    }
  };

  // Function to create label from selected rate
  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
    }

    setLoading(true);
    setErrors([]);

    try {
      // get rateId which user selected
      const response = await axios.post("/api/shipengine/label", {
        rateId: rateId,
      });
      const labelData = response.data;
      // see the response of label in browser
      console.log(labelData);
      // set pdf url
      setLabelPdf(labelData.labelDownload.href);
      // set tracking obj
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:flex  justify-center  text-black   overflow-clip py-8 md:px-4 px-0 lg:px-8">
      <div className="max-w-[250px] md:max-w-[650px] mx-auto bg-white rounded-lg  md:p-6">
      <h1 className="text-xl font-semibold">How would you like to get your order?</h1>
      <p className="max-w-sm text-sm my-4">Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <u className="font-semibold"> Learn More</u> </p>
      <div className="max-w-sm border-black border-2 my-4 rounded-lg flex items-center">
        <h4 className="text-xl font-semibold my-4 ml-4">Deliver It</h4>
       
    </div>
    <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-lg font-semibold">Shipment Details?</AccordionTrigger>
    <AccordionContent>
    <h1 className="text-xl font-semibold mt-10">Enter your name and address.</h1>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className=" my-10">
          {/* To Address Section */}
          <div>
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ship To Address
            </h2> */}
            <div className="space-y-4 flex flex-col">
              <input
                type="text"
                placeholder="Name"
                value={shipeToAddress.name}
                onChange={(e) =>
                  setshipeToAddress({ ...shipeToAddress, name: e.target.value })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="number"
                placeholder="Phone"
                value={shipeToAddress.phone}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    phone: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={shipeToAddress.addressLine1}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    addressLine1: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={shipeToAddress.addressLine2}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    addressLine2: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
              />
              <input
                type="text"
                placeholder="City"
                value={shipeToAddress.cityLocality}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    cityLocality: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="text"
                placeholder="State/Province"
                value={shipeToAddress.stateProvince}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    stateProvince: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="number"
                placeholder="Postal Code"
                value={shipeToAddress.postalCode}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
              <input
                type="text"
                placeholder="Country Code (e.g., PK)"
                value={shipeToAddress.countryCode}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    countryCode: e.target.value,
                  })
                }
                className="w-60 md:w-96 h-12 p-2 placeholder:text-black shadow-sm rounded-lg  border-2"
                required
              />
            </div>
          </div>
                
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6  w-60 md:w-96 rounded-lg h-16 bg-black text-white hover:bg-slate-700 disabled:bg-slate-700"
          >
            {loading ? "Calculating..." : "Get Shipping Rates"}
          </button>
        </form>
        
        {/* Display Available Rates */}
        {rates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Shipping Rates
            </h2>
            <div className="gap-4 grid md:grid-cols-2 items-center ">
              {rates.map((rate) => (
                <div
                  key={rate.rateId}
                  className={` border rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
                    rateId === rate.rateId
                      ? "border-black bg-blue-200"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  onClick={() => setrateId(rate.rateId)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingRate"
                      checked={rateId === rate.rateId}
                      onChange={() => setrateId(rate.rateId)}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        <strong>Carrier:</strong> {rate.carrierFriendlyName}
                      </p>
                      <p className="text-gray-600">
                        <strong>Service:</strong> {rate.serviceType}
                      </p>
                      <p className="text-gray-800 text-sm font-semibold">
                        <strong>Cost:</strong> {rate.shippingAmount.amount}{" "}
                        {rate.shippingAmount.currency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Label Button */}
        {rateId && (
          <div className="mt-8">
            <button
              onClick={handleCreateLabel}
              disabled={loading}
              className="mt-6  w-60 md:w-96 rounded-lg h-16 bg-black text-white hover:bg-slate-700 disabled:bg-slate-700"
            >
              {loading ? "Creating Label..." : "Create Label"}
            </button>
          </div>
        )}
        
        {trackingObj && (
          <div className="mt-8">
            <h2 className="text-xl max-w-sm font-semibold text-gray-800 mb-4">
              Tracking thinks (We are using ShipEngine test api key so order will not trace)
            </h2>
            <p>Tracking number: {trackingObj.trackingNumber}</p>
            <p> labelId: {trackingObj.labelId}</p>
            <p> carrierCode: {trackingObj.carrierCode}</p>
            <Link href={`/tracking/?labelId=${trackingObj.labelId}`}>
              <button className="mt-6  w-32 rounded-lg h-12 bg-black text-white hover:bg-slate-700">Track Order</button>
            </Link>
          </div>
        )}
        {labelPdf && (
         <Link target="_blank" href={labelPdf}> <button className="mt-6  w-36 rounded-lg h-12 bg-black text-white hover:bg-slate-700 ">Download Label</button></Link>
        )}
        {errors.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Errors</h2>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
      

    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger className="text-lg font-semibold">Billing Details?</AccordionTrigger>
    <AccordionContent>
    
         <div>
                  <CheckoutPage/>
                </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
   
      
    </div>
    <div className=" hidden md:block max-w-[250px] md:max-w-[650px] mx-auto">
    <div className="border p-4 rounded-md shadow-sm    mb-6">
             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map((item) => (
          <div key={item._id} className="flex justify-between md:gap-10 lg:gap-20 mb-3">
            <span className="text-[14px] font-semibold">{item.name} (x{item.quantity})</span>
            <span className="text-[#48a02d]">₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span >₹{totalAmount}</span>
        </div>
      </div>
    </div>
    
    </div>
  );
};

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useCart } from "@/context/context";  // Cart context se data lena
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Checkout() {
//   const { cart } = useCart();  // Cart ka data get karna
//   const router = useRouter();

//   // Shipment details state
//   const [shipeToAddress, setshipeToAddress] = useState({
//     name: "",
//     phone: "",
//     addressLine1: "",
//     addressLine2: "",
//     cityLocality: "",
//     stateProvince: "",
//     postalCode: "",
//     countryCode: "US",
//     addressResidentialIndicator: "no",
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);

//   // Agar cart empty hai to wapas cart page bhej do
//   useEffect(() => {
//     if (cart.length === 0) {
//       router.push("/cart");
//     }
//   }, [cart, router]);

//   // Cart ka total amount calculate karna
//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * (item.quantity ?? 1),
//     0
//   ).toFixed(2);

//   // Order place karne ka function (Fake API call for now)
//   const handlePlaceOrder = async () => {
//     setLoading(true);
//     try {
//       // Yahan Stripe ya backend API call ho sakti hai
//       console.log("Order placed!", { cart, shipeToAddress, totalAmount });

//       alert("Order placed successfully! Redirecting to payment...");
//       router.push("/payment"); // Yahan Stripe ya confirmation page pe redirect karo
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setErrors(["Failed to place order. Try again."]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>

//       {/* Order Summary Section */}
//       <div className="border p-4 rounded-md shadow-sm bg-gray-100 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         {cart.map((item) => (
//           <div key={item._id} className="flex justify-between mb-3">
//             <span>{item.name} (x{item.quantity})</span>
//             <span>₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
//           </div>
//         ))}
//         <hr className="my-2" />
//         <div className="flex justify-between font-semibold text-lg">
//           <span>Total:</span>
//           <span>₹{totalAmount}</span>
//         </div>
//       </div>

//       {/* Shipping Details Form */}
//       <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
//       <form className="space-y-4">
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={shipeToAddress.name}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, name: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={shipeToAddress.phone}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, phone: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Address Line 1"
//           value={shipeToAddress.addressLine1}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine1: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           placeholder="City"
//           value={shipeToAddress.cityLocality}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, cityLocality: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           placeholder="State/Province"
//           value={shipeToAddress.stateProvince}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, stateProvince: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           value={shipeToAddress.postalCode}
//           onChange={(e) => setshipeToAddress({ ...shipeToAddress, postalCode: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </form>

//       {/* Place Order Button */}
//       <button
//         onClick={handlePlaceOrder}
//         disabled={loading}
//         className="mt-6 w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500"
//       >
//         {loading ? "Processing..." : "Place Order"}
//       </button>

//       {errors.length > 0 && (
//         <div className="mt-4 text-red-500">
//           {errors.map((error, index) => (
//             <p key={index}>{error}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

