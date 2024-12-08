import { CarouselSize } from "@/components/HeroCarousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Cart(){
    return (
        <main className="max-w-[1200px] mx-auto  mt-14">
            <div className="lg:flex lg:gap-x-14  xl:gap-x-20">

            
                <section className=" ">
                    <div className="bg-[#F5F5F5] p-4">
                        <h1 className="font-semibold">Free Delivery</h1>
                        <p className="text-sm">Applies to orders of ₹ 14 000.00 or more. <u className="font-semibold">View Details</u> </p>
                    </div>
                    <div className="mt-4 mb-10 ">
                        <h2 className="font-semibold text-xl">Bag</h2>
                        <div className="md:flex md:space-x-10 mx-20 md:mx-0 mt-6">
                            <Image src={"/featured/shoe1.png"} alt={"shoe"} width={200} height={200}/>
                            <div className="space-y-8">
                                <div className="md:flex justify-between font-semibold text-[12px] md:text-md md:gap-x-24"> 
                                    <h1>Nike Dri-FIT ADV TechKnit Ultra</h1>
                                    <p>MRP: ₹ 3 895.00</p>
                                </div>
                                <div className="space-y-2">
                                <h2 className="text-sm text-[#757575]">Men&apos;s Short-Sleeve Running Top</h2>
                                <h2 className="text-sm text-[#757575]">Ashen Slate/Cobalt Bliss</h2>
                                <h2 className="text-sm text-[#757575] ">Size : L<span className="ml-6">Qantity: 1</span></h2>
                                </div>
                                <div className="flex gap-4 ">
                                        <Image src={"/header/heart.png"} alt={"heart"} width={20} height={10}/>
                                    <Image src={"/header/delete.png"} alt={"delete"} width={18} height={10}/>
                                </div>
                                
                            </div>
                        </div>
                        <hr className="my-6"/>
                        <div className="md:flex md:space-x-10 mx-20 md:mx-0  mt-6">
                            <Image src={"/featured/shoe6.png"} alt={"shoe"} width={200} height={200}/>
                            <div className="space-y-8">
                                <div className="md:flex justify-between font-semibold text-[12px] md:text-md md:gap-x-20"> 
                                    <h1>Nike Air Max 97 SE</h1>
                                    <p>MRP: ₹ 16 995.00</p>
                                </div>
                                <div className="space-y-2">
                                <h2 className="text-sm text-[#757575]">Women&apos;s  Shoes</h2>
                                <h2 className="text-sm text-[#757575]">Flat Pewter/Light Bone/Black/White</h2>
                                <h2 className="text-sm text-[#757575] ">Size : M<span className="ml-6">Qantity: 8   </span></h2>
                                </div>
                                <div className="flex gap-4 ">
                                        <Image src={"/header/heart.png"} alt={"heart"} width={20} height={10}/>
                                    <Image src={"/header/delete.png"} alt={"delete"} width={18} height={10}/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                <section className=" flex flex-col ">
                    <h1 className="font-semibold mb-6">Summary</h1>
                    <div className="flex font-medium text-sm justify-between">
                        <h1>Subtotal</h1>
                        <h2>₹ 20 890.00</h2>
                    </div>
                    <div className="flex font-medium text-sm space-x-40 justify-between my-4">
                        <h1>Estimated Delivery & Handling</h1>
                        <h2>Free</h2>
                    </div>
                    <hr />
                    <div className="flex font-semibold text-sm space-x-40 justify-between my-4">
                        <h1>Total</h1>
                        <h2>₹ 20 890.00</h2>
                    </div>
                    <hr />
    
                    <Button className="mt-6 rounded-full h-16">Member Checkout</Button>
                </section>
            </div>

            <div>
                <h1 className="font-semibold text-xl ml-3 my-8">You Might Also Like This</h1>
                <CarouselSize/>
            </div>
        </main>
    )
}