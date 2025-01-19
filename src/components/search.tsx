// "use client"
// import { ChangeEvent, useEffect, useState } from "react"
// import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation"

// export default function SearchBar() {
//     const [query, setQuery] = useState<string>("")
//     const router = useRouter()

//     // Search Input Handle Function
//     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
//         setQuery(e.target.value)
//     }

//     // Redirect to Search Results Page on Enter
//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter" && query.trim() !== "") {
//             router.push(`/search?q=${query}`)
//         }
//     }

//     return (
//         <div className="relative">
//             <Input
//                 type="text"
//                 placeholder="Search for products, reviews, categories..."
//                 value={query}
//                 onChange={handleSearch}
//                 onKeyDown={handleKeyPress}
//                 className="p-2 border rounded-md w-full"
//             />
//         </div>
//     )
// }
