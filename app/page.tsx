"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Coins, Wallet, Zap } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import HeroScene from "@/components/hero-scene"
import NightSkyFooter from "@/components/night-sky-footer"
import WalletConnect from "@/components/wallet-connect"

export default function Home() {
  const { toast } = useToast()
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    setConnected(true)
    setWalletAddress("8dTJA6wKFfLS8ASMPt11EBCDxXsAQCtxJTGkXpVHvKCd")
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to Phantom wallet",
    })
  }

  return (
    <main className="flex flex-col">
      <section className="relative h-[80vh] w-full overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
              Build on Solana
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              The fastest blockchain in the world and the fastest growing ecosystem in crypto
            </p>
            {!connected ? (
              <WalletConnect onConnect={connectWallet} />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/wallet">
                    View Wallet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-purple-500 text-purple-500">
                  <Link href="/token-launchpad">
                    Create Token
                    <Coins className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Solana Tools</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, deploy, and manage your Solana applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wallet className="h-10 w-10 text-purple-500" />}
            title="Wallet Management"
            description="Connect your Solana wallet, view balances, and manage your assets with ease."
            link="/wallet"
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            title="DevNet Airdrops"
            description="Request SOL tokens on Solana DevNet for testing your applications."
            link="/wallet"
            delay={0.2}
          />
          <FeatureCard
            icon={<Coins className="h-10 w-10 text-green-500" />}
            title="Token Launchpad"
            description="Create your own Solana tokens with custom name, symbol, and supply."
            link="/token-launchpad"
            delay={0.3}
          />
        </div>
      </section>

      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0a0118] to-[#0f0326] overflow-hidden">
    
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <NightSkyFooter />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of developers building the future of finance on Solana
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/token-launchpad">Launch Your Token</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

const FeatureCard = ({ icon, title, description, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <Link href={link}>
      <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-gray-800 mb-4">{icon}</div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
)
