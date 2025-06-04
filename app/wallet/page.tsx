"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, RefreshCw, Wallet, ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import WalletConnect from "@/components/wallet-connect"

export default function WalletPage() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sendAmount, setSendAmount] = useState(0.1)
  const [recipient, setRecipient] = useState("")
  const [airdropAmount, setAirdropAmount] = useState(1)
  const [sendLoading, setSendLoading] = useState(false)
  const [airdropLoading, setAirdropLoading] = useState(false)

  const connectWallet = async () => {
    // Placeholder for actual wallet connection logic
    setConnected(true)
    setWalletAddress("8dTJA6wKFfLS8ASMPt11EBCDxXsAQCtxJTGkXpVHvKCd")
    toast.success("Wallet Connected", {
      description: "Successfully connected to Phantom wallet",
    })
    fetchBalance()
  }

  const fetchBalance = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Random balance between 1 and 10 SOL
      const mockBalance = (Math.random() * 9 + 1).toFixed(4)
      setBalance(mockBalance)
      setLoading(false)
    }, 1000)
  }

  const handleSendTokens = async () => {
    if (!recipient) {
      toast.error("Error", {
        description: "Please enter a recipient address",
      })
      return
    }

    if (sendAmount <= 0) {
      toast.error("Error", {
        description: "Amount must be greater than 0",
      })
      return
    }

    setSendLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSendLoading(false)
      toast.success("Transaction Successful", {
        description: `${sendAmount} SOL has been sent to ${recipient.slice(0, 4)}...${recipient.slice(-4)}`,
      })
      fetchBalance()
    }, 2000)
  }

  const handleRequestAirdrop = async () => {
    setAirdropLoading(true)

    // Simulate API call
    setTimeout(() => {
      setAirdropLoading(false)
      toast.success("Airdrop Successful", {
        description: `${airdropAmount} SOL has been airdropped to your wallet`,
      })
      fetchBalance()
    }, 2000)
  }

  useEffect(() => {
    if (connected) {
      fetchBalance()
    }
  }, [connected])

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Connect your Solana wallet to view your balance, request airdrops, and send tokens
          </p>
        </motion.div>
        <WalletConnect onConnect={connectWallet} />
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 bg-gray-950 min-h-screen">
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-3">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Solana Wallet</h3>
                    <p className="text-xs text-gray-400">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={fetchBalance}
                  disabled={loading}
                  className="text-gray-400 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Current Balance</p>
                  {loading ? (
                    <div className="h-8 w-32 bg-gray-700 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h2 className="text-3xl font-bold">{balance} SOL</h2>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Network</p>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm">Solana DevNet</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="send">Send Tokens</TabsTrigger>
              <TabsTrigger value="airdrop">Request Airdrop</TabsTrigger>
            </TabsList>
            <TabsContent value="send" className="space-y-4">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-address">From</Label>
                    <Input
                      id="from-address"
                      value={walletAddress}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300"
                    />
                  </div>

                  <div className="flex justify-center my-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <ArrowDown className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to-address">To</Label>
                    <Input
                      id="to-address"
                      placeholder="Enter recipient wallet address"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="send-amount">Amount (SOL)</Label>
                    <Input
                      id="send-amount"
                      type="number"
                      min="0.000001"
                      step="0.1"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(Number.parseFloat(e.target.value))}
                      className="bg-gray-800 border-gray-700 text-gray-300"
                    />
                  </div>

                  <Button
                    onClick={handleSendTokens}
                    disabled={sendLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    {sendLoading ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                        Processing Transaction...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Send Tokens
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="airdrop" className="space-y-4">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet-address">Wallet Address</Label>
                    <Input
                      id="wallet-address"
                      value={walletAddress}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (SOL)</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="amount"
                        type="number"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={airdropAmount}
                        onChange={(e) => setAirdropAmount(Number.parseFloat(e.target.value))}
                        className="bg-gray-800 border-gray-700 text-gray-300"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setAirdropAmount(1)}
                        className="border-gray-700 text-gray-300"
                      >
                        1 SOL
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setAirdropAmount(2)}
                        className="border-gray-700 text-gray-300"
                      >
                        2 SOL
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Maximum 5 SOL per request on DevNet</p>
                  </div>

                  <Button
                    onClick={handleRequestAirdrop}
                    disabled={airdropLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    {airdropLoading ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Request Airdrop
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-medium mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {loading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-800/50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <>
                <TransactionItem type="receive" amount="2.0" address="3Nfr6MU..." time="2 hours ago" />
                <TransactionItem type="send" amount="0.5" address="7YUkG4J..." time="1 day ago" />
                <TransactionItem type="receive" amount="1.0" address="Airdrop" time="2 days ago" />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function TransactionItem({ type, amount, address, time }) {
  const isReceive = type === "receive"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            isReceive ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          }`}
        >
          {isReceive ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
        </div>
        <div>
          <p className="font-medium">{isReceive ? "Received" : "Sent"}</p>
          <p className="text-xs text-gray-400">{address}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${isReceive ? "text-green-500" : "text-red-500"}`}>
          {isReceive ? "+" : "-"}
          {amount} SOL
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </motion.div>
  )
}
