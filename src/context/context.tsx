"use client"
import {  createContext, useContext, useEffect, useState } from "react"

type ProviderContextType = {
    children:React.ReactNode
}
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

interface CreateContextType {
    cart:Products[]
    addToCart:(data:Products)=>void
}
export const CartContext = createContext<CreateContextType|null>(null)

export default function Context({children}:ProviderContextType){
    const [cart,setCart] = useState<Products[]>([])
    useEffect(()=>{
        const storedCart = localStorage.getItem("cart")
        if(storedCart){
            setCart(JSON.parse(storedCart))
        }
    },[])
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    const addToCart = (data: Products)=>{
        
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === data._id);
            if (existingProduct) {
              return prevCart.map((item) =>
                item._id === data._id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              );
            }
            // setCount(cart.length)
            
            return [...prevCart, { ...data, quantity: 1 }];
        })
    }
    return <CartContext.Provider value={{cart,addToCart}}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}