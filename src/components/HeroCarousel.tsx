import * as React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Link from "next/link"
import { airMAx } from "./SanityFetch"
import { urlFor } from "@/sanity/lib/image"



export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[315px] md:max-w-[760px] lg:max-w-[1024px] xl:max-w-[1440px] mx-auto"
    >
      <CarouselContent>
        {airMAx.map((item) => (
          
          <CarouselItem key={item._id} className="md:basis-1/2 lg:basis-1/3">
            <Link href={`/product/${item._id}`}>
            <div className="p-1">
              <Card>
                <CardContent className=" bg-[#F5F5F5] aspect-square group ">
                 <Image src={urlFor(item.image).width(440).url()} alt={"shoes"} width={440} height={440}/>
                </CardContent>
                
              </Card>
            </div>
                <div className=" flex justify-between mx-2 mt-2">
                  <h1 className="font-semibold text-sm">{item.name}</h1>
                    <h2 className="font-semibold text-sm">${item.price}</h2>
                </div>
                <h3 className="ml-2 text-sm">{item.category}</h3>
                </Link>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <div className="absolute  bottom-[420px] md:bottom-[490px] lg:bottom-[450px] xl:bottom-[560px] right-14  ">
      <CarouselPrevious />
      <CarouselNext />
      </div>
   
    </Carousel>
  )
}
