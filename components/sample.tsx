"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useLicenseContract } from "@/hooks/useContract"
import { isAddress } from "viem"

const SampleIntegration = () => {
  const { isConnected } = useAccount()
  const [licenseId, setLicenseId] = useState("")
  const [holder, setHolder] = useState("")
  const [metadata, setMetadata] = useState("")
  const [revokeId, setRevokeId] = useState("")
  const [checkId, setCheckId] = useState("")
  const { actions, state } = useLicenseContract()

  const handleIssue = async () => {
    if (!licenseId || !holder || !isAddress(holder)) return
    try {
      await actions.issueLicense(licenseId, holder, metadata)
      setLicenseId("")
      setHolder("")
      setMetadata("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleRevoke = async () => {
    if (!revokeId) return
    try {
      await actions.revokeLicense(revokeId)
      setRevokeId("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <h2 className="text-2xl font-bold">Please connect wallet</h2>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">License Registry</h1>

      {/* Issue License */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Issue License</h2>
        <input className="w-full p-2 border rounded" placeholder="License ID"
          value={licenseId} onChange={(e) => setLicenseId(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Holder (0x...)"
          value={holder} onChange={(e) => setHolder(e.target.value)} />
        {!isAddress(holder) && holder && <p className="text-red-500 text-sm">Invalid address</p>}
        <input className="w-full p-2 border rounded" placeholder="Metadata (optional)"
          value={metadata} onChange={(e) => setMetadata(e.target.value)} />

        <button onClick={handleIssue}
          disabled={state.isLoading || !licenseId || !isAddress(holder)}
          className="w-full p-2 bg-blue-600 text-white rounded">
          {state.isLoading ? "Processing..." : "Issue License"}
        </button>
      </div>

      {/* Revoke License */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Revoke License</h2>
        <input className="w-full p-2 border rounded" placeholder="License ID"
          value={revokeId} onChange={(e) => setRevokeId(e.target.value)} />

        <button onClick={handleRevoke}
          disabled={state.isLoading || !revokeId}
          className="w-full p-2 bg-red-600 text-white rounded">
          {state.isLoading ? "Processing..." : "Revoke"}
        </button>
      </div>

      {/* Transaction Status */}
      {state.hash && (
        <div className="p-3 border rounded bg-muted">
          <p className="break-all text-xs">{state.hash}</p>
        </div>
      )}

      {state.error && (
        <p className="text-red-500 text-sm">Error: {state.error.message}</p>
      )}
    </div>
  )
}

export default SampleIntegration