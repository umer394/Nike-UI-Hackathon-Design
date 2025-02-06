import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Context from "@/context/context";
import { Toaster } from "sonner";
import Chatbot from "@/components/Chatbot";
import {
  ClerkProvider,
 
} from '@clerk/nextjs'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "umer next website",
  description: "umer next website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <Context>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
        <Navbar/>
        {children}
      
        <Chatbot/>
        
        <Toaster />
        <Footer/>
      </body>
      </Context>
    </html>
    </ClerkProvider>
  );
}
