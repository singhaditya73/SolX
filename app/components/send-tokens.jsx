"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function SendTokens({ walletAddress }) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState(0.1)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSendTokens = async () => {
    if (!recipient) {
      toast({
        title: "Error",
        description: "Please enter a recipient address",
        variant: "destructive",
      })
      return
    }

    if (amount <= 0) {
      toast({
        title: "Error",
        description: "Amount must be greater than 0",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Transaction Successful",
        description: `${amount} SOL has been sent to ${recipient.slice(0, 4)}...${recipient.slice(-4)}`,
      })
    }, 2000)

    // This is where you would implement the actual send logic
    // Example:
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const transaction = new Transaction().add(
    //   SystemProgram.transfer({
    //     fromPubkey: new PublicKey(walletAddress),
    //     toPubkey: new PublicKey(recipient),
    //     lamports: amount * LAMPORTS_PER_SOL
    //   })
    // );
    // const signature = await sendTransaction(transaction, connection);
    // await connection.confirmTransaction(signature, "confirmed");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Send Tokens</h2>
        <p className="text-gray-400">Send SOL tokens to another wallet address on the Solana network.</p>
      </div>

      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from-address">From</Label>
          <Input
            id="from-address"
            value={walletAddress}
            readOnly
            className="bg-gray-900 border-gray-700 text-gray-300"
          />
        </div>

        <div className="flex justify-center my-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-gray-300" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-address">To</Label>
          <Input
            id="to-address"
            placeholder="Enter recipient wallet address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-gray-900 border-gray-700 text-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="send-amount">Amount (SOL)</Label>
          <Input
            id="send-amount"
            type="number"
            min="0.000001"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
            className="bg-gray-900 border-gray-700 text-gray-300"
          />
        </div>

        <Button
          onClick={handleSendTokens}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          {loading ? (
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
      </div>

      <div className="p-4 bg-gray-800/30 rounded-lg">
        <h3 className="font-medium mb-2">Transaction Fees</h3>
        <p className="text-sm text-gray-400">
          Solana has very low transaction fees, typically around 0.000005 SOL per transaction. Transactions are usually
          confirmed within 400ms.
        </p>
      </div>
    </div>
  )
}
