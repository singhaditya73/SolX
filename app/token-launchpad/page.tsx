"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Check, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import WalletConnect from "@/components/wallet-connect"
import TokenScene from "@/components/token-scene"

export default function TokenLaunchpad() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    description: "",
    supply: 1000000,
    decimals: 9,
    imageUrl: "",
  })
  const { toast } = useToast()

  const connectWallet = async () => {
    // Placeholder for actual wallet connection logic
    setConnected(true)
    setWalletAddress("8dTJA6wKFfLS8ASMPt11EBCDxXsAQCtxJTGkXpVHvKCd")
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to Phantom wallet",
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTokenData((prev) => ({
      ...prev,
      [name]: name === "supply" || name === "decimals" ? Number(value) : value,
    }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!tokenData.name || !tokenData.symbol) {
        toast({
          title: "Missing Information",
          description: "Please provide both token name and symbol",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 2) {
      if (!tokenData.imageUrl) {
        toast({
          title: "Missing Information",
          description: "Please provide an image URL for your token",
          variant: "destructive",
        })
        return
      }
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleCreateToken()
    }
  }

  const handleCreateToken = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Token Created Successfully",
        description: `Your ${tokenData.name} (${tokenData.symbol}) token has been created!`,
      })
      // Reset form after successful creation
      setTokenData({
        name: "",
        symbol: "",
        description: "",
        supply: 1000000,
        decimals: 9,
        imageUrl: "",
      })

      setStep(1)
    }, 3000)
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Connect your Solana wallet to create your own token on the Solana blockchain
          </p>
        </motion.div>
        <WalletConnect onConnect={connectWallet} />
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Form */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold">Token Launchpad</h1>
            <p className="text-gray-400">Create your own Solana token in just a few steps.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-between mb-6"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === i
                      ? "bg-gradient-to-r from-purple-600 to-blue-500"
                      : step > i
                        ? "bg-green-500"
                        : "bg-gray-700"
                  }`}
                >
                  {step > i ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-white font-medium">{i}</span>
                  )}
                </div>
                <span className="text-xs mt-2 text-gray-400">
                  {i === 1 ? "Basics" : i === 2 ? "Details" : "Review"}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-gray-900/50 rounded-xl border border-gray-700"
          >
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Token Basics</h3>

                <div className="space-y-2">
                  <Label htmlFor="token-name">Token Name</Label>
                  <Input
                    id="token-name"
                    name="name"
                    placeholder="e.g. My Awesome Token"
                    value={tokenData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-symbol">Token Symbol</Label>
                  <Input
                    id="token-symbol"
                    name="symbol"
                    placeholder="e.g. MAT"
                    value={tokenData.symbol}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                  <p className="text-xs text-gray-500">2-5 characters recommended</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Token Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="token-image">Token Image URL</Label>
                  <Input
                    id="token-image"
                    name="imageUrl"
                    placeholder="https://example.com/token-image.png"
                    value={tokenData.imageUrl}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                  <p className="text-xs text-gray-500">URL to your token's logo or image (PNG or SVG recommended)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-description">Description (Optional)</Label>
                  <Textarea
                    id="token-description"
                    name="description"
                    placeholder="Describe your token's purpose"
                    value={tokenData.description}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-supply">Initial Supply</Label>
                  <Input
                    id="token-supply"
                    name="supply"
                    type="number"
                    min="1"
                    value={tokenData.supply}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-decimals">Decimals</Label>
                  <Input
                    id="token-decimals"
                    name="decimals"
                    type="number"
                    min="0"
                    max="9"
                    value={tokenData.decimals}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-gray-300"
                  />
                  <p className="text-xs text-gray-500">Solana tokens typically use 9 decimals</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Review & Create</h3>

                <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Name:</span>
                    <span className="font-medium">{tokenData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Symbol:</span>
                    <span className="font-medium">{tokenData.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Initial Supply:</span>
                    <span className="font-medium">{tokenData.supply.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Decimals:</span>
                    <span className="font-medium">{tokenData.decimals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Image URL:</span>
                    <span className="font-medium truncate max-w-[200px]">{tokenData.imageUrl}</span>
                  </div>
                  {tokenData.description && (
                    <div className="pt-2 border-t border-gray-700">
                      <span className="text-gray-400 block mb-1">Description:</span>
                      <p className="text-sm">{tokenData.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-start p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-500">
                      Creating a token requires a small amount of SOL for transaction fees and rent.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="border-gray-700 text-gray-300">
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                onClick={handleNextStep}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    Creating Token...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {step === 3 ? (
                      <>
                        <Coins className="mr-2 h-4 w-4" />
                        Create Token
                      </>
                    ) : (
                      "Next Step"
                    )}
                  </span>
                )}
              </Button>
            </div>
          </motion.div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 bg-gray-800/30 rounded-lg"
            >
              <h3 className="font-medium mb-2">What is a Solana Token?</h3>
              <p className="text-sm text-gray-400">
                Solana tokens are digital assets that live on the Solana blockchain. They can represent anything from
                cryptocurrencies to in-game items, loyalty points, or voting rights in a DAO.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Column - 3D Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[50vh] lg:h-auto relative rounded-xl overflow-hidden"
        >
          <TokenScene tokenData={tokenData} step={step} />
        </motion.div>
      </div>
    </main>
  )
}
