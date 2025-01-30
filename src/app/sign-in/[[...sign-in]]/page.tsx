

import Image from "next/image"



  import { SignIn } from '@clerk/nextjs'
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
                        <h1 className="font-bold text-xl ">YOUR ACCOUNT</h1>
                        <h1 className="font-bold text-xl ">FOR EVERYTHING </h1>
                        <h1 className="font-bold text-xl ">NIKE</h1>
                    </div>
                    
                    <div className="my-4">
                    
                        <SignIn/>
                    
                    </div>
                    
                </div>
            </section>
        </main>
    )
}