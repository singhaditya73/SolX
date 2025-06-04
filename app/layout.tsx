import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

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
          <div className="min-h-screen relative">
            <Navbar />
            {children}
            <Toaster
              theme="dark"
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: "rgba(26, 26, 46, 0.95)",
                  border: "1px solid rgba(0, 255, 225, 0.3)",
                  color: "#f1f1f1",
                  backdropFilter: "blur(10px)",
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
