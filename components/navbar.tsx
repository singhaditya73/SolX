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
      className="sticky top-0 z-50 space-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-neon-aqua to-neon-purple rounded-full mr-2 neon-glow"></div>
              <span className="font-bold text-xl text-soft-white">SolX</span>
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
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-gray hover:text-neon-aqua hover:bg-gray-700/50 focus:outline-none transition-colors"
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
          className="md:hidden space-nav"
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
          <div className="pt-4 pb-3 border-t border-neon-aqua/20">
            <div className="px-2">
              <WalletConnect buttonVariant="mobile" />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all ${
        active
          ? "border-neon-aqua text-neon-aqua"
          : "border-transparent text-muted-gray hover:border-neon-purple hover:text-neon-purple"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
        active
          ? "bg-neon-aqua/10 text-neon-aqua border border-neon-aqua/30"
          : "text-muted-gray hover:bg-neon-purple/10 hover:text-neon-purple"
      }`}
    >
      {children}
    </Link>
  )
}
