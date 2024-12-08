import Image from "next/image"
export default function Navbar(){
    return (
        <header>
            <section className="bg-[#F5F5F5]">
                <div className="max-w-[1300px] mx-auto flex justify-between font-sans p-1 m">
                    <Image src={"/header/logo.png"} alt={"logo"} width={24} height={24}/>
                    <div className="px-1 py-[2px] bg-white">
                        <h1 className="text-sm font-semibold">Skip to main content</h1>
                    </div>
                    <div className="flex space-x-2 text-sm font-semibold">
                        <h1>Find a Store</h1>
                        <h2>|</h2>
                        <h1>Help</h1>
                        <h2>|</h2>
                        <h1>Join Us</h1>
                        <h2>|</h2>
                        <h1>Sign In</h1>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="flex justify-between max-w-[1300px] mx-auto items-center">
                    <Image src={"/header/nike.png"} alt={"niike"} width={50} height={40}/>
                    <ul className="flex font-semibold space-x-6">
                        <li>New & Featured</li>
                        <li>Men</li>
                        <li>Women</li>
                        <li>kids</li>
                        <li>Sale</li>
                        <li>SNKRS</li>
                    </ul>
                    <div className="flex space-x-2">
                        
                        <div>
                        <input type="text" className="bg-[#F5F5F5] placeholder:text-[#CCCCCC] placeholder:text-sm max-w-[180px] rounded-full px-4 py-1" placeholder="Search"/>                            
                        </div>
                        <div>
                        <Image src={"/header/heart.png"} alt={"heart"} width={24} height={24}/>
                        </div>
                        <div>
                        <Image src={"/header/cart.png"} alt={"cart"} width={24} height={24}/>
                        </div>
                       
                    </div>
                </div>
            </section>
            <section className="bg-[#F5F5F5] flex flex-col justify-center items-center">
                <h1 className="font-semibold">Hello Nike App</h1>
                <p className="text-sm">Download the app to access everything Nike. <u className="font-semibold">Get Your Great</u></p>
            </section>
        </header>
    )
}