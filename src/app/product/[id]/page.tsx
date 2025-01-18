

import { airMAx } from "@/components/SanityFetch"


import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"


import Image from "next/image"
export interface Products{
    _id:string
    id:string
    name:string
    inventory:number
    price:number
    status:string
    category:string
    size:string[]
    colors:string[]
    image:string

}

export default async function HeroProduct ({params,}:{params:Promise<{id:string}>}){

    const id = (await params).id
    // console.log(id)
    const ListingData = async()=>{
        const res = await client.fetch(`*[ _id == "${id}"]{_id,id,name,inventory,price,status,category,image,size,colors}`)
        return res
    }
    const item:Products[] = await ListingData()
    // console.log(data)
    // function urlFor(image: string) {
    //     throw new Error("Function not implemented.")
    // }
    

    return (
        <main className="max-w-[900px] p-4 mx-auto my-20">
            {item.map((data)=>{
                return (
                    <div key={data._id} className="md:flex md:space-x-10 lg:space-x-40" >
                <Image src={urlFor(data.image).width(500).url()} alt={"shoe"} width={500} height={500}/>
                <div>
                    <h1 className="text-xl md:text-4xl">{data.name}</h1>
                    <h2 className="text-lg text-[#757575]">{data.category}</h2>
                    <h1 className="text-lg font-semibold mt-10">MRP:$ {data.price}</h1>
                    <h2 className="text-lg text-[#757575]">incl. of taxes</h2>
                    <h2 className="text-lg text-[#757575]">(Also includes all applicable duties)</h2>
                    <section>
                        <div className="flex justify-between mt-6">
                            <h1 className="font-semibold text-sm">Select Size</h1>
                            <h1 className="text-sm text-[#757575]">Size Guide</h1>

                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {
                                data.size.map((sizes,index)=>{
                                    return (
                                        <Button key={index} className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">{sizes}</Button>
                                    
                                )})
                            }
                           
                        </div>
                        <Button className="bg-black hover:bg-white hover:text-black mt-4 w-72 md:w-96 rounded-full h-14">Add to </Button>
                    </section>
                </div>
                
            </div>
                )
            })}
            
        </main>
        
    )
}