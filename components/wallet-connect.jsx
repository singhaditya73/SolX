"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WalletConnect({ onConnect, buttonVariant = "default" }) {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false)
      if (onConnect) onConnect()
    }, 1000)
  }

  if (buttonVariant === "navbar") {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
      >
        {connecting ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
            Connecting...
          </span>
        ) : (
          <span className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </span>
        )}
      </Button>
    )
  }

  if (buttonVariant === "mobile") {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
      >
        {connecting ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
            Connecting...
          </span>
        ) : (
          <span className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </span>
        )}
      </Button>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleConnect}
        disabled={connecting}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8 py-6 text-lg"
      >
        {connecting ? (
          <span className="flex items-center">
            <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
            Connecting...
          </span>
        ) : (
          <span className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </span>
        )}
      </Button>
    </motion.div>
  )
}
