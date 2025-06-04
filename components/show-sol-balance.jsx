"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ShowSolBalance({ walletAddress }) {
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchBalance = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Random balance between 1 and 10 SOL
      const mockBalance = (Math.random() * 9 + 1).toFixed(4)
      setBalance(mockBalance)
      setLoading(false)
    }, 1000)

    // This is where you would implement the actual balance fetch logic
    // Example:
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const balance = await connection.getBalance(new PublicKey(walletAddress));
    // setBalance(balance / LAMPORTS_PER_SOL);
  }

  useEffect(() => {
    fetchBalance()
  }, [walletAddress])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Wallet Balance</h2>
        <p className="text-gray-400">View your current SOL balance and transaction history.</p>
      </div>

      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 overflow-hidden">
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

      <div className="space-y-4">
        <h3 className="font-medium">Recent Transactions</h3>

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <TransactionItem type="receive" amount="2.0" address="3Nfr6MU..." time="2 hours ago" />
            <TransactionItem type="send" amount="0.5" address="7YUkG4J..." time="1 day ago" />
            <TransactionItem type="receive" amount="1.0" address="Airdrop" time="2 days ago" />
          </div>
        )}
      </div>
    </div>
  )
}

function TransactionItem({ type, amount, address, time }) {
  const isReceive = type === "receive"

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            isReceive ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          }`}
        >
          <ArrowIcon direction={isReceive ? "down" : "up"} />
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
    </div>
  )
}

function ArrowIcon({ direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "down" ? <path d="M12 5v14M19 12l-7 7-7-7" /> : <path d="M12 19V5M5 12l7-7 7 7" />}
    </svg>
  )
}
