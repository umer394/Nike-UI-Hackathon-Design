// "use client"
// import { useSearchParams } from "next/navigation"
// import { client } from "@/sanity/lib/client"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { urlFor } from "@/sanity/lib/image"
// import Image from "next/image"

// export interface SearchResult {
//     _id: string
//     id: string
//     name: string
//     inventory: number
//     price: number
//     status: string
//     category: string
//     size: string[]
//     colors: string[]
//     image: string
//     quantity?: number
// }
// export default function SearchPage() {
//     const searchParams = useSearchParams()
//     const query = searchParams.get("q") || ""
//     const [results, setResults] = useState<SearchResult[]>([])

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             if (!query) return

//             const res = await client.fetch(`
//                 *[
//                     name match "*${query}*" || 
//                     category match "*${query}*" || 
//                     description match "*${query}*"
//                 ]{
//                     _id, name, category, price, description, image, 
//                     _type as type
//                 }
//             `)
//             setResults(res)
//         }

//         fetchSearchResults()
//     }, [query])

//     return (
//         <main className="max-w-[900px] p-4 mx-auto my-10">
//             <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>

//             {results.length === 0 ? (
//                 <p className="text-gray-500 mt-4">No results found.</p>
//             ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-5">
//                     {results.map((item) => (
//                         <div key={item._id} className="border rounded-lg p-4">
//                             {item.image && (
//                                 <Image src={urlFor(item.image).width(200).url()} alt={item.name} width={200} height={200} />
//                             )}
//                             <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
//                             {item.category && <p className="text-gray-500">{item.category}</p>}
//                             {item.price && <p className="text-black font-bold mt-2">${item.price}</p>}
//                             <Button className="mt-2 bg-black text-white">View More</Button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </main>
//     )
// }
