"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { Github, Twitter, Globe } from "lucide-react"
import NightSkyFooter from "@/components/night-sky-footer"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0118] to-[#0f0326] border-t border-gray-800">
      {/* Night Sky Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <NightSkyFooter />
          </Suspense>
        </Canvas>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-2"></div>
              <span className="font-bold text-xl text-white">Solana DApp</span>
            </div>
            <p className="text-gray-400 text-sm">Build the future of finance on the fastest blockchain in the world.</p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Github className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Globe className="h-4 w-4" />} />
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Product</h3>
            <div className="space-y-2">
              <FooterLink href="/wallet">Wallet</FooterLink>
              <FooterLink href="/token-launchpad">Token Launchpad</FooterLink>
              <FooterLink href="/">Dashboard</FooterLink>
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Resources</h3>
            <div className="space-y-2">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">API Reference</FooterLink>
              <FooterLink href="#">Tutorials</FooterLink>
              <FooterLink href="#">Community</FooterLink>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <div className="space-y-2">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Solana DApp. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="#" className="text-sm">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" className="text-sm">
              Terms of Service
            </FooterLink>
            <FooterLink href="#" className="text-sm">
              Cookie Policy
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children, className = "" }) {
  return (
    <Link href={href} className={`text-gray-400 hover:text-white transition-colors ${className}`}>
      {children}
    </Link>
  )
}

function SocialLink({ href, icon }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
    >
      {icon}
    </Link>
  )
}
