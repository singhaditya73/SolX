import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solana DApp",
  description: "Modern Solana Decentralized Application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen bg-gradient-to-b from-black to-gray-950">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
