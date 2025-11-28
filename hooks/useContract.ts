'use client'

import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export const useLicenseContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: validityResult, refetch: refetchValidity } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "isValid",
    args: [""],
    query: { enabled: false },
  })

  useEffect(() => {}, [isConfirmed])

  const issueLicense = async (id: string, holder: string, metadata: string) => {
    if (!id || !holder) return

    // Ensure holder is a valid 0x-prefixed address
    const formattedHolder = (holder.startsWith('0x') ? holder : `0x${holder}`) as `0x${string}`

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "issueLicense",
        args: [id, formattedHolder, metadata],
      })
    } catch (err) {
      console.error("Error issuing license:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const revokeLicense = async (id: string) => {
    if (!id) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "revokeLicense",
        args: [id],
      })
    } catch (err) {
      console.error("Error revoking license:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const checkLicenseValidity = async (id: string) => {
    return await refetchValidity()
  }

  return {
    actions: { issueLicense, revokeLicense, checkLicenseValidity },
    state: {
      isLoading: isLoading || isPending || isConfirming,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    },
  }
}