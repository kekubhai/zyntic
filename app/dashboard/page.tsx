import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Receipt, TrendingUp } from 'lucide-react'


export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Get user data and stats
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      clients: true,
      projects: true,
      invoices: true,
      workspaces: true,
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  const stats = {
    totalClients: user.clients.length,
    activeProjects: user.projects.filter(p => p.status === 'ACTIVE').length,
    pendingInvoices: user.invoices.filter(i => i.status === 'SENT').length,
    totalRevenue: user.invoices
      .filter(i => i.status === 'PAID')
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0),
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.firstName || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">
              ₹{stats.pendingInvoices * 50000} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your workspaces
            </CardDescription>
          </CardHeader>
          <CardContent>
          
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Add Client</div>
                <div className="text-sm text-gray-600">Create a new client profile</div>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">New Project</div>
                <div className="text-sm text-gray-600">Start a new project</div>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Create Invoice</div>
                <div className="text-sm text-gray-600">Generate an invoice</div>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">Upload Files</div>
                <div className="text-sm text-gray-600">Share files with clients</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
