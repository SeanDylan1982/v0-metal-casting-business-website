import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import GoogleAnalytics from "../GoogleAnalytics.tsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Frafiks Melting & Casting | Custom Metal Products South Africa",
  description:
    "Professional metal casting services in South Africa. Specializing in potjie pots, jewelry, religious art, and custom metal products. Wholesale and retail available.",
  keywords: "metal casting, potjie pots, South Africa, custom metal, jewelry, religious art, wholesale",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}
