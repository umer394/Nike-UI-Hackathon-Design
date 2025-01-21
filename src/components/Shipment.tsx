// "use client"
// import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"

// import { useState } from "react";
// import { Address, Rate, trackingObjType } from "@/components/data/type";
// import axios from "axios";
// import { cartProductsWhichCanBeShipped } from "@/components/data/data";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import ShippingRatesPage from "@/components/Shipment";
// // import ShippingRatesPage from "@/components/Shipment";


// export default function Page() {
//     const [shipeToAddress, setshipeToAddress] = useState<Address>({
//         name: "",
//         // lastName:"",
//         // email: "",
//         phone: "",
//         addressLine1: "",
//         addressLine2: "", // Optional
//         // addressLine3: "", // Optional
//         cityLocality: "",
//         stateProvince: "",
//         postalCode: "",
//         countryCode: "PK",
//         addressResidentialIndicator: "no", // 'no' means a commercial address
//     });
//     const [rates, setRates] = useState<Rate[]>([]);
//     const [rateId, setrateId] = useState<string | null>(null);
//     const [labelPdf, setLabelPdf] = useState<string | null>(null);
//     const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState<string[]>([]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrors([]);
//         setRates([]);

//         try {
//             const response = await axios.post("/api/shipengine/get-rates", {
//                 shipeToAddress,
//                 // map the cart products which can be shipped and use only weight and dimensions
//                 packages: cartProductsWhichCanBeShipped.map((product) => ({
//                     weight: product.weight,
//                     dimensions: product.dimensions,
//                 })),
//             });
//             // if (!shipeToAddress.cityLocality ) {
//             //     alert("City is required!");
//             //     return;
//             //   }
//             // see the response in browser
//             console.log(response.data);
//             // Update the state with the fetched rates
//             setRates(response.data.shipmentDetails.rateResponse.rates);
//         } catch (error) {
//             console.log(error);
//             setErrors(["An error occurred while fetching rates."]);
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleCreateLabel = async () => {
//         if (!rateId) {
//             alert("Please select a rate to create a label.");
//         }

//         setLoading(true);
//         setErrors([]);

//         try {
//             // get rateId which user selected
//             const response = await axios.post("/api/shipengine/label", {
//                 rateId: rateId,
//             });
//             const labelData = response.data;
//             // see the response of label in browser
//             console.log(labelData);
//             // set pdf url
//             setLabelPdf(labelData.labelDownload.href);
//             // set tracking obj
//             setTrackingObj({
//                 trackingNumber: labelData.trackingNumber,
//                 labelId: labelData.labelId,
//                 carrierCode: labelData.carrierCode,
//             });
//         } catch (error) {
//             console.log(error);
//             setErrors(["An error occurred while creating the label."]);
//             alert("Pleace check your internet connection,An error occurred while creating the label.")
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <main className="max-w-[1200px] mx-auto">
//             <div className="my-20">
//                 <section className="">
//                     <h1 className="text-xl font-semibold">How would you like to get your order?</h1>
//                     <p className="max-w-sm text-sm my-4">Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <u> Learn More</u> </p>
//                     <div className="max-w-sm border-black border-2 my-4 rounded-lg flex items-center">
//                         <h4 className="text-xl font-semibold my-4 ml-4">Deliver It</h4>
//                     </div>
//                     <h1 className="text-xl font-semibold mt-10">Enter your name and address.</h1>
//                     <div  className="space-y-4 my-10">
//                         <form onSubmit={handleSubmit}>
//                         <Input type="text" placeholder="First Name" required value={shipeToAddress.name} onChange={(e) => setshipeToAddress({ ...shipeToAddress, name: e.target.value })} className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
//                         {/* <Input type="text" placeholder="Last Name" value={shipeToAddress.lastName} onChange={(e) => setshipeToAddress({ ...shipeToAddress, lastName: e.target.value })} className="w-96 h-12 placeholder:text-black shadow-sm  border-2" /> */}
//                         <Input type="text" placeholder="Address Line 1" required value={shipeToAddress.addressLine1} onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine1: e.target.value })} className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
//                         <Input type="text" placeholder="Address Line 2" value={shipeToAddress.addressLine2} onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine2: e.target.value })} className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
//                         {/* <Input type="text" placeholder="Address Line 3" value={shipeToAddress.addressLine3} onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine3: e.target.value })} className="w-96 h-12 placeholder:text-black shadow-sm  border-2" /> */}
//                         <div className="flex gap-6">
//                             <Input type="number" placeholder="Postal Code" required value={shipeToAddress.postalCode} onChange={(e) => setshipeToAddress({ ...shipeToAddress, postalCode: e.target.value })} className="w-[180px]  h-12 placeholder:text-black shadow-sm  border-2" />
//                             <Input type="text" placeholder="City" required value={shipeToAddress.cityLocality} onChange={(e) => setshipeToAddress({ ...shipeToAddress, cityLocality: e.target.value })} className="w-[180px] h-12 placeholder:text-black shadow-sm  border-2" />
//                         </div>
//                         <div className="flex gap-6 mb-6">


//                             <Input type="" placeholder="Pakistan" readOnly disabled className="w-[180px] h-12 placeholder:text-black shadow-sm  border-2" />
//                             <Select value={shipeToAddress.stateProvince} required onValueChange={(value) => setshipeToAddress({ ...shipeToAddress, stateProvince: value })}>
//                                 <SelectTrigger className="w-[180px] h-12">
//                                     <SelectValue placeholder="State" className="placeholder:text-black" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="PB">Punjab</SelectItem>
//                                     <SelectItem value="SD">Sindh</SelectItem>
//                                     <SelectItem value="BL">Balochistan</SelectItem>
//                                     <SelectItem value="KPK">Khyber Pakhtunkhwa</SelectItem>
//                                     <SelectItem value="GB">Gilgit-Baltistan</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="flex flex-col text-black gap-4 gap-y-8 ">
//                             <div className="flex items-center space-x-2 pt-4 pb-2">
//                                 <Checkbox id="terms" />
//                                 <label
//                                     htmlFor="terms"
//                                     className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Save this address to my profile
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 pt-2 pb-4">
//                                 <Checkbox id="terms" />
//                                 <label
//                                     htmlFor="terms"
//                                     className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Make this my preferred address
//                                 </label>
//                             </div>
//                         </div>
//                         <h1 className="text-xl font-semibold py-4 ">What's Your Contact Information</h1>
//                         {/* <Input type="email" placeholder="Email Address" required value={shipeToAddress.email}
//                             onChange={(e) =>
//                                 setshipeToAddress({ ...shipeToAddress, email: e.target.value })
//                             } className="w-96 h-12 placeholder:text-black shadow-sm  border-2" /> */}
//                         <Input type="phone" placeholder="Phone Number" required value={shipeToAddress.phone}
//                             onChange={(e) =>
//                                 setshipeToAddress({ ...shipeToAddress, phone: e.target.value })
//                             } className="w-96 h-12 placeholder:text-black shadow-sm  border-2" />
//                         <div className="flex items-center max-w-sm space-x-2 py-2">
//                             <Checkbox id="terms" required />
//                             <label
//                                 htmlFor="terms"
//                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                             >
//                                 I have read and consent to eShopWorld processing my information in accordance with the <u className="font-semibold">Privacy Statement</u>  and <u className="font-semibold">Cookie Policy.</u>  eShopWorld is a trusted Nike partner.
//                             </label>
//                         </div>
//                         <Button  disabled={loading} className="mt-6  w-96 rounded-lg h-16">
//                             {loading ? "Calculating Rates" : "Place Order"}
//                         </Button>
//                         </form>
//                         {rates.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Available Shipping Rates
//             </h2>
//             <div className="gap-4 flex items-center flex-wrap">
//               {rates.map((rate) => (
//                 <div
//                   key={rate.rateId}
//                   className={`p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
//                     rateId === rate.rateId
//                       ? "border-blue-500 bg-blue-100"
//                       : "border-gray-200 bg-gray-50"
//                   }`}
//                   onClick={() => setrateId(rate.rateId)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="shippingRate"
//                       checked={rateId === rate.rateId}
//                       onChange={() => setrateId(rate.rateId)}
//                       className="form-radio h-4 w-4 text-blue-500"
//                     />
//                     <div>
//                       <p className="text-lg font-medium text-gray-700">
//                         <strong>Carrier:</strong> {rate.carrierFriendlyName}
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>Service:</strong> {rate.serviceType}
//                       </p>
//                       <p className="text-gray-800 font-semibold">
//                         <strong>Cost:</strong> {rate.shippingAmount.amount}{" "}
//                         {rate.shippingAmount.currency}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Create Label Button */}
//         {rateId && (
//           <div className="mt-8">
//             <button
//               onClick={handleCreateLabel}
//               disabled={loading}
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
//             >
//               {loading ? "Creating Label..." : "Create Label"}
//             </button>
//           </div>
//         )}
//         {labelPdf && (
//          <Link target="_blank" href={labelPdf}> <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Download Label</button></Link>
//         )}
//         {trackingObj && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Tracking thinks (We are using ShipEngine test api key so order will not trace)
//             </h2>
//             <p>tracking number: {trackingObj.trackingNumber}</p>
//             <p> labelId: {trackingObj.labelId}</p>
//             <p> carrierCode: {trackingObj.carrierCode}</p>
//             <Link href={`/tracking/?labelId=${trackingObj.labelId}`}>
//               <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Track Order</button>
//             </Link>
//           </div>
//         )}
//         {errors.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Errors</h2>
//             <div className="space-y-2">
//               {errors.map((error, index) => (
//                 <p key={index} className="text-red-500">
//                   {error}
//                 </p>
//               ))}
//             </div>
//           </div>
//         )}
//                         <div>
                        
//                         </div>
//                     </div>
//                 </section>
//                 <section>
//                     <ShippingRatesPage/>
//                 </section>
//             </div>
//         </main>
//     )
// }
