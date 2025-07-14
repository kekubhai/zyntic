export interface AuthUser {
  id: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  role: 'ADMIN' | 'FREELANCER' | 'CLIENT'
}

export interface UserProfile {
  businessName?: string
  website?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country: string
  pincode?: string
  gstin?: string
}

export interface DashboardStats {
  totalClients: number
  activeProjects: number
  pendingInvoices: number
  totalRevenue: number
  monthlyRevenue: number
  revenueGrowth: number
}

export interface NotificationData {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}
