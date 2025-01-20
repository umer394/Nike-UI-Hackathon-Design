
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
export default function Login(){
    return (
        <main>
            <section className="my-20">
                <div className="flex flex-col justify-center items-center max-w-lg mx-auto">
                <Image
                    src={"/header/nike.png"}
                    alt="Nike Logo"
                    width={65} height={35}
                    />
                    <div className=" items-center justify-center flex flex-col">
                        <h1 className="font-bold text-xl ">View or Manage Your Order</h1>
                        <h1 className="max-w-[300px] my-4 text-sm text-center  ">To check the status of your order, or to start a return, please enter your order number and email address.</h1>
                        
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 mt-3">
                        <Input type="text" placeholder="Order Number" className="w-80" />
                        <Input type="Email" placeholder="Email Address" className="w-80" />
                        
                    </div>
                        
                    
                    <Button className="w-80 ronded-sm my-6">SUBMIT</Button>
                    <p className="text-[#BCBCBC] text-[12px]">Already a Member?<Link href={"/login"}> <u className="text-black">Sign In</u></Link></p>
                </div>
            </section>
        </main>
    )
}