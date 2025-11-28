'use client'

import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt, readContract } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export const useLicenseContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {}, [isConfirmed])

  const issueLicense = async (id: string, holder: string, metadata: string) => {
    if (!id || !holder) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "issueLicense",
        args: [id, holder, metadata],
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
    try {
      const result = await readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "isValid",
        args: [id],
      })
      return result
    } catch (err) {
      console.error("Error checking license:", err)
      throw err
    }
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