"use client"
import {  createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
    removeFromCart: (id:string) => void;
    updateCartQuantity:(id:string,quantity:number)=>void
    addToWishlist:(data:Products)=>void
    wishlist:Products[]
    removeFromWishlist:(id:string)=>void
}
export const CartContext = createContext<CreateContextType|null>(null)

export default function Context({children}:ProviderContextType){
    const [cart,setCart] = useState<Products[]>([])

    const [wishlist,setWishlist] = useState<Products[]>([])
    const router = useRouter()
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
        toast("Item added to cart!", {
            description: `${data.name} has been successfully added to your cart.`,
            action: {
              label: "View Cart",
              onClick: () => router.push("/cart"), 
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
          
            
            return [...prevCart, { ...data, quantity: 1 }];
        })

    }

    const removeFromCart = (_id: string) => {
        const newCart = setCart((prevItems) =>
          prevItems.filter((cart) => cart._id   !== _id)
        );
        localStorage.removeItem(JSON.stringify(newCart))
      };  

      const updateCartQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === id ? { ...item, quantity } : item
          )
        );
      };

      useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        setWishlist(parsedWishlist);

    }, []);
      const addToWishlist = (data:Products) => {
        toast("Item added to wishlist!", {
            description: `${data.name} has been successfully added to your wishlist.`,
            action: {
              label: "View Wishlist",
              onClick: () => router.push("/wishlist"), // Or navigate to cart page
            },
          });
        const updatedWishlist = wishlist.some(p => p._id === data._id)
        ? wishlist.filter(p => p._id !== data._id)
        : [...wishlist, data];

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        
      }
      const removeFromWishlist = (id: string) => {
        setWishlist((prevWish) => {
            const updatedWishlist = prevWish.filter((wishlist) => wishlist._id !== id);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // ✅ update localStorage
            return updatedWishlist;
        });
    }

    return <CartContext.Provider value={{cart,addToCart,removeFromCart,updateCartQuantity,addToWishlist,wishlist,removeFromWishlist}}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}