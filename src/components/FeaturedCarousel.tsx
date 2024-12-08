import * as React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"

import Link from "next/link"
import { feature } from "@/data/homepage"


export function FeaturedCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="flex flex-wrap gap-y-10">
        {feature.map((item) => (
          
          <CarouselItem key={item.id} className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
            <Link href={``}>
            <div className="p-1">
              <Card>
                <CardContent className=" bg-[#F5F5F5] aspect-square group p-0">
                 <Image src={item.img} alt={"shoes"} width={440} height={440}/>
                </CardContent>
                
              </Card>
            </div>
                <div className=" mx-2 mt-2">
                    <h4 className="font-semibold text-[#9E3500] text-sm">Just In</h4>
                  <h1 className="font-semibold text-sm mt-2">{item.title}</h1>
                  <h3 className=" text-sm text-[#757575]">{item.title2}</h3>
                  <h4 className="text-sm text-[#757575]">1 Colour</h4>
                    <h2 className="font-medium text-sm mt-2">MRP : {item.price}</h2>
                </div>
                
                </Link>
          </CarouselItem>
        ))}
        
      </CarouselContent>

    </Carousel>
  )
}
