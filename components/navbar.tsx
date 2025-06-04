"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import WalletConnect from "@/components/wallet-connect"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-2"></div>
              <span className="font-bold text-xl">Solana DApp</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLink href="/" active={isActive("/")}>
                Home
              </NavLink>
              <NavLink href="/wallet" active={isActive("/wallet")}>
                Wallet
              </NavLink>
              <NavLink href="/token-launchpad" active={isActive("/token-launchpad")}>
                Token Launchpad
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <WalletConnect buttonVariant="navbar" />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 backdrop-blur-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" active={isActive("/")}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/wallet" active={isActive("/wallet")}>
              Wallet
            </MobileNavLink>
            <MobileNavLink href="/token-launchpad" active={isActive("/token-launchpad")}>
              Token Launchpad
            </MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              <WalletConnect buttonVariant="mobile" />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
        active
          ? "border-purple-500 text-white"
          : "border-transparent text-gray-300 hover:border-gray-300 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}
