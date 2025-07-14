'use client'

import { useEffect, useState } from 'react'
import { Subscription } from '@/types/prisma'

interface SubscriptionData {
  subscription: Subscription | null
  availablePlans: any[]
  loading: boolean
  error: string | null
}

export function useSubscription() {
  const [data, setData] = useState<SubscriptionData>({
    subscription: null,
    availablePlans: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/razorpay/subscription')
      if (!response.ok) {
        throw new Error('Failed to fetch subscription')
      }
      
      const result = await response.json()
      
      setData(prev => ({
        ...prev,
        subscription: result.subscription,
        availablePlans: result.availablePlans,
        loading: false,
      }))
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
    }
  }

  const createSubscription = async (planId: string) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/razorpay/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create subscription')
      }
      
      const result = await response.json()
      
      // Refresh subscription data
      await fetchSubscription()
      
      return result
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      throw error
    }
  }

  const hasActiveSubscription = () => {
    return data.subscription?.status === 'ACTIVE' || data.subscription?.status === 'TRIALING'
  }

  const isSubscriptionExpired = () => {
    if (!data.subscription?.currentPeriodEnd) return false
    return new Date(data.subscription.currentPeriodEnd) < new Date()
  }

  return {
    ...data,
    createSubscription,
    hasActiveSubscription,
    isSubscriptionExpired,
    refresh: fetchSubscription,
  }
}
