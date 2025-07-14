'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { UserWithRelations } from '@/types/prisma'

export function useAuth() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const [dbUser, setDbUser] = useState<UserWithRelations | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      if (!isLoaded || !isSignedIn || !clerkUser) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user')
        if (response.ok) {
          const userData = await response.json()
          setDbUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [clerkUser, isLoaded, isSignedIn])

  return {
    clerkUser,
    dbUser,
    isLoaded,
    isSignedIn,
    loading,
    isAuthenticated: isSignedIn && !!dbUser,
  }
}

export function useUserRole() {
  const { dbUser } = useAuth()
  
  return {
    role: dbUser?.role || 'FREELANCER',
    isAdmin: dbUser?.role === 'ADMIN',
    isFreelancer: dbUser?.role === 'FREELANCER',
    isClient: dbUser?.role === 'CLIENT',
  }
}
