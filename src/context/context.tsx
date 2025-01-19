"use client"
import {  createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
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
    count:number
    addToCart:(data:Products)=>void
    removeFromCart: (id:string) => void;
    updateCartQuantity:(id:string,quantity:number)=>void
}
export const CartContext = createContext<CreateContextType|null>(null)

export default function Context({children}:ProviderContextType){
    const [cart,setCart] = useState<Products[]>([])
    const [count,setCount] = useState<number>(0)
    useEffect(()=>{
        const storedCart = localStorage.getItem("cart")
        if(storedCart){
            setCart(JSON.parse(storedCart))
            setCount(JSON.parse(storedCart).length)
        }
    },[])
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    const addToCart = (data: Products)=>{
        toast("Item added to cart!", {
            description: `${data.name} has been successfully added to your cart.`,
            action: {
              label: "View Cart",
              onClick: () => console.log("cart"), // Or navigate to cart page
            },
          });
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

    const removeFromCart = (_id: string) => {
        setCart((prevItems) =>
          prevItems.filter((cart) => cart._id   !== _id)
        );
      };  

      const updateCartQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === id ? { ...item, quantity } : item
          )
        );
      };


    return <CartContext.Provider value={{count,cart,addToCart,removeFromCart,updateCartQuantity}}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}