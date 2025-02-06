"use client"

import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function IncDec({ quantity, updateQuantity}: { quantity: number; updateQuantity: (newQuantity: number) => void }){
      const [increment,setIncrement] = useState<number>(1)

      function Increment(){
        const newQuantity = increment + 1;
        setIncrement(newQuantity);
        updateQuantity(newQuantity);
      }
      function Decrement(){
        const newQuantity = increment - 1;
        setIncrement(newQuantity);
        updateQuantity(newQuantity);
    }
    // const {Increment,Decrement , increment} = useIncrement()
    
    return(
        <div>
            {quantity >= 2 ? (
                <div className="flex justify-center  items-center border-[#afadad] border-[1px] gap-2   ">
                    <button className=" bg-[#afadad]  py-1 " onClick={Decrement}><FaMinus color="black" size={20} /></button>
                    <h2 className="text-lg">{quantity}</h2>
                    <button className="bg-[#afadad] py-1" onClick={Increment}><FaPlus color="black" size={20}/></button>
                </div>
            ):(
                <div className="flex justify-center  items-center border-[#afadad] border-[1px] gap-2">
                    <button className=" bg-[#afadad] py-1" ><FaMinus color="black" size={20} /></button>
                    <h2 className="text-lg">{quantity}</h2>
                    <button className="bg-[#afadad] py-1" onClick={Increment}><FaPlus color="black" size={20}/></button>
                </div>
            )}
            
        </div>
    )
}