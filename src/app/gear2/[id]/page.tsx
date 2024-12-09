

interface Items {
    id:number
    img:string
    title:string
    title2:string
    price:string
}

import { Button } from "@/components/ui/button"
import { gear2 } from "@/data/homepage"
import Image from "next/image"
export default async function HeroProduct ({params,}:{params:Promise<{id:string}>}){

    const id = (await params).id
    const data: Items = gear2[parseInt(id) - 1];
    
    return (
        <main className="max-w-[900px] p-4 mx-auto my-20">
            <div className="md:flex md:space-x-10 lg:space-x-40" >
                <Image src={`${data.img}`} alt={"shoe"} width={500} height={500}/>
                <div>
                    <h1 className="text-xl md:text-4xl">{data.title}</h1>
                    <h2 className="text-lg text-[#757575]">{data.title2}</h2>
                    <h1 className="text-lg font-semibold mt-10">MRP:{data.price}</h1>
                    <h2 className="text-lg text-[#757575]">incl. of taxes</h2>
                    <h2 className="text-lg text-[#757575]">(Also includes all applicable duties)</h2>
                    <section>
                        <div className="flex justify-between mt-6">
                            <h1 className="font-semibold text-sm">Select Size</h1>
                            <h1 className="text-sm text-[#757575]">Size Guide</h1>

                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 6 (EU 40)</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 6.5</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 7</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 7.5</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 8</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 8.5</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 9</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 9.5</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 10</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 10.5</Button>
                            <Button className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">UK 11</Button>
                        </div>
                        <Button className="bg-black hover:bg-white hover:text-black mt-4 w-72 md:w-96 rounded-full h-14">Add to Blog</Button>
                    </section>
                </div>
                
            </div>
        </main>
        
    )
}