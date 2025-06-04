"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Coins, Wallet, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import WalletConnect from "@/components/wallet-connect"

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    // Placeholder for actual wallet connection logic
    setConnected(true)
    setWalletAddress("8dTJA6wKFfLS8ASMPt11EBCDxXsAQCtxJTGkXpVHvKCd")
    toast.success("Wallet Connected", {
      description: "Successfully connected to Phantom wallet",
    })
  }

  return (
    <main className="flex flex-col relative z-10">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">Build on Solana</h1>
            <p className="text-xl md:text-2xl text-muted-gray mb-8">
              The fastest blockchain in the world and the fastest growing ecosystem in crypto
            </p>
            {!connected ? (
              <WalletConnect onConnect={connectWallet} />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="space-button">
                  <Link href="/wallet">
                    View Wallet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-neon-aqua text-neon-aqua hover:bg-neon-aqua hover:text-black"
                >
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

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-soft-white mb-4">Powerful Solana Tools</h2>
          <p className="text-muted-gray max-w-2xl mx-auto">
            Everything you need to build, deploy, and manage your Solana applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wallet className="h-10 w-10 text-neon-purple" />}
            title="Wallet Management"
            description="Connect your Solana wallet, view balances, and manage your assets with ease."
            link="/wallet"
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-neon-aqua" />}
            title="DevNet Airdrops"
            description="Request SOL tokens on Solana DevNet for testing your applications."
            link="/wallet"
            delay={0.2}
          />
          <FeatureCard
            icon={<Coins className="h-10 w-10 text-neon-purple" />}
            title="Token Launchpad"
            description="Create your own Solana tokens with custom name, symbol, and supply."
            link="/token-launchpad"
            delay={0.3}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-soft-white mb-4">Ready to start building?</h2>
            <p className="text-muted-gray max-w-2xl mx-auto mb-8">
              Join thousands of developers building the future of finance on Solana
            </p>
            <Button asChild size="lg" className="space-button neon-glow">
              <Link href="/token-launchpad">Launch Your Token</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, link, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <Link href={link}>
      <Card className="h-full space-card">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-gray-800/50 mb-4 border border-neon-aqua/30">{icon}</div>
          <h3 className="text-xl font-medium mb-2 text-soft-white">{title}</h3>
          <p className="text-muted-gray">{description}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
)
