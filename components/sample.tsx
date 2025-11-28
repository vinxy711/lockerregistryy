"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useWillContract } from "@/hooks/useContract"
import { isAddress } from "viem"

const SampleIntregation = () => {
  const { isConnected, address } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [claimOwner, setClaimOwner] = useState("")
  const [claimIndex, setClaimIndex] = useState("")

  const { data, actions, state } = useWillContract()

  const handleCreateWill = async () => {
    if (!recipientAddress || !depositAmount || !isAddress(recipientAddress)) return
    try {
      await actions.createWill(recipientAddress, depositAmount)
      setRecipientAddress("")
      setDepositAmount("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleClaim = async () => {
    try {
      const owner = claimOwner || address || ""
      if (!owner || !isAddress(owner)) return
      const index = Number(claimIndex || 0)
      await actions.claimWill(owner, index)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Will Contract</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  const isRecipientValid = recipientAddress && isAddress(recipientAddress)
  const canDeposit = isRecipientValid && depositAmount
  const canClaim = (claimOwner ? isAddress(claimOwner) : true) && (claimIndex === "" || Number(claimIndex) >= 0)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Will Contract</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your digital inheritance</p>
        </div>

        {/* Contract Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Contract Balance</p>
            <p className="text-2xl font-semibold text-foreground">{data.contractBalance} FLR</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Your Wills</p>
            <p className="text-2xl font-semibold text-foreground">{data.myWillsCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          {/* Step 1: Set Recipient */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <label className="block text-sm font-medium text-foreground">Set Recipient</label>
            </div>
            <input
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {recipientAddress && !isAddress(recipientAddress) && (
              <p className="text-xs text-destructive mt-1">Invalid address</p>
            )}
          </div>

          {/* Step 2: Deposit - disabled until recipient is valid */}
          <div className={isRecipientValid ? "opacity-100" : "opacity-50 pointer-events-none"}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isRecipientValid ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </span>
              <label className="block text-sm font-medium text-foreground">Deposit FLR</label>
              {!isRecipientValid && <span className="text-xs text-muted-foreground">(Set valid recipient first)</span>}
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              disabled={!isRecipientValid}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Create Will Button */}
          <button
            onClick={handleCreateWill}
            disabled={state.isLoading || state.isPending || !canDeposit}
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {state.isLoading || state.isPending ? "Creating Will..." : "Create Will"}
          </button>

          {/* Claim */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              <label className="block text-sm font-medium text-foreground">Claim Funds</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Owner address (optional)"
                value={claimOwner}
                onChange={(e) => setClaimOwner(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {/* <input
                type="number"
                placeholder="Will index"
                value={claimIndex}
                onChange={(e) => setClaimIndex(e.target.value)}
                min="0"
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              /> */}
            </div>
            {claimOwner && !isAddress(claimOwner) && (
              <p className="text-xs text-destructive">Invalid owner address</p>
            )}
            <button
              onClick={handleClaim}
              disabled={state.isLoading || state.isPending || !canClaim}
              className="w-full px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {state.isLoading || state.isPending ? "Claiming..." : "Claim Funds"}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
