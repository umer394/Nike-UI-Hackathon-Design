import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaHeart, FaShoppingBag } from 'react-icons/fa'; 
export default function Navbar() {
  return (
    <header className=''>
    {/* Top bar */}
    <div className="bg-[#fafafa] flex justify-between items-center px-6 py-2 md:text-[11px] sm:text-[9px] text-[8px] font-medium text-gray-500">
      <Link href={"/"}><Image src={"/header/logo.png"} alt={''} width={24} height={24}/></Link>
      <div>
  <p className="text-black text-[9px] md:text-sm bg-white px-1">Skip to main content</p>
</div>
      <div className="flex md:gap-4 sm:gap-3 gap-2 font-semibold">
        <Link href="/location" className="hover:text-gray-800">Find a Store</Link>
        <Link href="#" className="hover:text-gray-800">Help</Link>
        <Link href="/Join" className="hover:text-gray-800">Join Us</Link>
        <Link href="/login" className="hover:text-gray-800">Sign In</Link>
      </div>
    </div>

    {/* Main navigation */}
    <div className="flex flex-wrap justify-between items-center px-6 py-4">
      {/* Left section (Logo) */}
      <div className="flex items-center">
        <Link href={"/"}>
        <Image
          src={"/header/nike.png"}
          alt="Nike Logo"
          width={35} height={35}
        />
        </Link>
        
      </div>

      {/* Center section (Navigation Links) */}
      <nav className="flex gap-4 md:gap-6 text-gray-700  md:text-[16px] sm:text-[14px] font-semibold text-[10px] ">
        <Link href="/new" className="hover:text-black whitespace-nowrap">New & Featured</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Men</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Women</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Kids</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Sale</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">SNKRS</Link>
      </nav>

      {/* Right section (Search, Wishlist, Cart) */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full pl-4 bg-[#F5F5F5] pr-10 py-2 text-sm focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>
        <FaHeart className="text-gray-700 md:w-[24px] md:h-[24px] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]  cursor-pointer hover:text-black" />
        <FaShoppingBag className="text-gray-700 md:w-[24px] md:h-[24px] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px] cursor-pointer hover:text-black" />
      </div>
    </div>

    {/* Mobile Search Bar */}
    <div className="block md:hidden px-6 mt-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none w-full"
        />
        <FaSearch className="absolute right-3 top-2.5 text-gray-500" />

      </div>
      
    </div>
  </header>
  );
}




// import Image from "next/image"
// export default function Navbar(){
//     return (
//         <header>
//             <section className="bg-[#F5F5F5]">
//                 <div className="max-w-[1300px] mx-auto flex justify-between font-sans p-1 m">
//                     <Image src={"/header/logo.png"} alt={"logo"} width={24} height={24}/>
//                     <div className="px-1 py-[2px] bg-white">
//                         <h1 className="text-sm font-semibold">Skip to main content</h1>
//                     </div>
//                     <div className="flex space-x-2 text-sm font-semibold">
//                         <h1>Find a Store</h1>
//                         <h2>|</h2>
//                         <h1>Help</h1>
//                         <h2>|</h2>
//                         <h1>Join Us</h1>
//                         <h2>|</h2>
//                         <h1>Sign In</h1>
//                     </div>
//                 </div>
//             </section>
//             <section className="">
//                 <div className="flex justify-between max-w-[1300px] mx-auto items-center">
//                     <Image src={"/header/nike.png"} alt={"niike"} width={50} height={40}/>
//                     <ul className="flex font-semibold space-x-6">
//                         <li>New & Featured</li>
//                         <li>Men</li>
//                         <li>Women</li>
//                         <li>kids</li>
//                         <li>Sale</li>
//                         <li>SNKRS</li>
//                     </ul>
//                     <div className="flex space-x-2">
                        
//                         <div>
//                         <input type="text" className="bg-[#F5F5F5] placeholder:text-[#CCCCCC] placeholder:text-sm max-w-[180px] rounded-full px-4 py-1" placeholder="Search"/>                            
//                         </div>
//                         <div>
//                         <Image src={"/header/heart.png"} alt={"heart"} width={24} height={24}/>
//                         </div>
//                         <div>
//                         <Image src={"/header/cart.png"} alt={"cart"} width={24} height={24}/>
//                         </div>
                       
//                     </div>
//                 </div>
//             </section>
//             <section className="bg-[#F5F5F5] flex flex-col justify-center items-center">
//                 <h1 className="font-semibold">Hello Nike App</h1>
//                 <p className="text-sm">Download the app to access everything Nike. <u className="font-semibold">Get Your Great</u></p>
//             </section>
//         </header>
//     )
// }