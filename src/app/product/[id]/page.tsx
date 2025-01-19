
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/context"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"




import Image from "next/image"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
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
    quantity?:number
}

export default  function HeroProduct ({params,}:{params:Promise<{id:string}>}){
    const [item,setItem] = useState<Products[]>([])
    const [ID,setID] = useState<string>("")
    const [comment,setComment] = useState<string>("")
    const [comments,setComments] = useState<string[]>([])
    useEffect(()=>{
        const fetchData =async () => {
            const id = (await params).id
            setID(id)
            // console.log(id)
            const ListingData = async()=>{
                const res = await client.fetch(`*[ _id == "${id}"]{_id,id,name,inventory,price,status,category,image,size,colors}`)
                return res
            }
            const product:Products[] = await ListingData() 
            setItem(product)
        }
        fetchData()
    },[])
    
    
  
    useEffect(() => {
        const savedReview = localStorage.getItem(`review-${ID}`);
        setComments(savedReview ? JSON.parse(savedReview) : []);
    }, [ID]);
    const inputComment =(e:ChangeEvent<HTMLInputElement>)=>{
        setComment(e.target.value)
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
    
        // Retrieve existing reviews (ensure it's an array)
        const existingReviews = JSON.parse(localStorage.getItem(`review-${ID}`) || "[]");
    
        if (!Array.isArray(existingReviews)) {
            console.error("Invalid data in localStorage, resetting reviews.");
            localStorage.setItem(`review-${ID}`, JSON.stringify([]));
            return;
        }
    
        // Append new review
        const updatedReviews = [...existingReviews, comment];
    
        // Save updated reviews to localStorage
        localStorage.setItem(`review-${ID}`, JSON.stringify(updatedReviews));
    
        // Update state
        setComments(updatedReviews);
        setComment("");
    
        alert("Review saved!");
    };
    const {addToCart} = useCart()
    return (
        <main className="max-w-[900px] p-4 mx-auto my-20">
            {item.map((data)=>{
                return (
                    <div key={data._id}  >
                        <div className="md:flex md:space-x-10 lg:space-x-40">
                        <Image src={urlFor(data.image).width(500).url()} alt={data.name} width={500} height={500}/>
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
                        <div>
                        <h1 className="font-semibold text-sm">Select Color</h1>
                            {data.colors.map((item,index)=>{
                                return (
                                    <Button key={index} className="bg-white text-black border-[1px] boder-black hover:bg-black hover:text-white">{item}</Button>
                                )
                            })}
                        </div>
                        <div className=" flex gap-3 mt-4">
                            <Button className="bg-white hover:bg-[#a7a3a3]">
                            <Image src={"/header/heart.png"} alt={"heart"} width={24} height={24}/>
                            </Button>
                           
                            
                            <Button onClick={()=>addToCart(data)} className="bg-white hover:bg-[#a7a3a3]">
                                <Image src={"/header/cart.png"} alt={"cart"} width={24} height={24}/>
                            </Button>
                           
                        </div>
                        <Button  className="bg-black hover:bg-white hover:text-black mt-4 w-72 md:w-96 rounded-full h-14">Proceed To Checkout</Button>
                    </section>
                </div>
                        </div>
                
                <div className="my-10">
                    <h1 className="font-semibold text-2xl text-black">Add Reviews</h1>
                    <div className="max-w-[500px]  my-4">
                        <Input value={comment} className="py-7" onChange={inputComment}/>
                    </div>
                        <Button className="hover:text-black hover:bg-white hover:border-black hover:border-[1px]" onClick={handleSubmit}>Submit Review</Button>
                    <div>
                        {comments.map((item,index)=>{
                            return (
                                <div key={index} className="my-4 max-w-sm px-2 py-2 flex items-center gap-4 bg-[#e9e7e7] ">
                                    <Image src={urlFor(data.image).width(40).url()} alt={data.name} width={40} height={40}/>
                                    <h1  className="">{item}</h1>

                                </div>
                                
                            )
                        })}
                    </div>
                </div>
            </div>
                )
            })}
            
        </main>
        
    )
}