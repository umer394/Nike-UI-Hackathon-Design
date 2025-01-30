

import Image from "next/image"


import { SignUp } from "@clerk/nextjs"

export default function Joinn(){
    return (
        <main>
            <section className="my-20">
                <div className="flex flex-col  justify-center   items-center max-w-lg mx-auto">
                <Image
                    src={"/header/nike.png"}
                    alt="Nike Logo"
                    width={65} height={35}
                    />
                    <div className=" items-center justify-center  flex flex-col">
                        <h1 className="font-bold text-xl ">BECOME A NIKE MEMBER</h1>
                        
                    </div>
                    <div className="mt-10 mb-5  max-w-[280px] mx-auto">
                    <p className="text-[#BCBCBC] text-[12px] "   >Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community</p>
                    </div>
                    <div >
                                        
                                            <SignUp/>
                                        
                                        </div>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p className="text-[#BCBCBC] text-[12px]">By creating an account, you agree to Nike&apos;s <u className=" text-black">Privacy Policy</u></p>
                        <p className="text-[#BCBCBC] text-[12px]">and <u className="text-black">Terms of Use</u></p>
                    </div>
                    
                    
                </div>
            </section>
        </main>
    )
}