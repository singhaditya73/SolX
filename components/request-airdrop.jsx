"use client"

import { useState } from "react"
import { ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function RequestAirdrop({ walletAddress }) {
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleRequestAirdrop = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Airdrop Successful",
        description: `${amount} SOL has been airdropped to your wallet`,
      })
    }, 2000)

    // This is where you would implement the actual airdrop logic
    // Example:
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const airdropSignature = await connection.requestAirdrop(
    //   new PublicKey(walletAddress),
    //   amount * LAMPORTS_PER_SOL
    // );
    // await connection.confirmTransaction(airdropSignature);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Request Airdrop</h2>
        <p className="text-gray-400">Request SOL tokens from the Solana DevNet faucet for testing purposes.</p>
      </div>

      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wallet-address">Wallet Address</Label>
          <Input
            id="wallet-address"
            value={walletAddress}
            readOnly
            className="bg-gray-900 border-gray-700 text-gray-300"
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
              value={amount}
              onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
              className="bg-gray-900 border-gray-700 text-gray-300"
            />
            <Button variant="outline" onClick={() => setAmount(1)} className="border-gray-700 text-gray-300">
              1 SOL
            </Button>
            <Button variant="outline" onClick={() => setAmount(2)} className="border-gray-700 text-gray-300">
              2 SOL
            </Button>
          </div>
          <p className="text-xs text-gray-500">Maximum 5 SOL per request on DevNet</p>
        </div>

        <Button
          onClick={handleRequestAirdrop}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          {loading ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Request Airdrop
            </span>
          )}
        </Button>
      </div>

      <div className="p-4 bg-gray-800/30 rounded-lg">
        <h3 className="font-medium mb-2">What is an Airdrop?</h3>
        <p className="text-sm text-gray-400">
          Airdrops on Solana DevNet allow developers to receive free test tokens for development and testing. These
          tokens have no real value and can only be used on the test network.
        </p>
      </div>
    </div>
  )
}
