import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import DashboardHeader from '@/components/DashboardHeader'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  
  // Sync user with database
  await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email: user?.emailAddresses[0]?.emailAddress || '',
      firstName: user?.firstName,
      lastName: user?.lastName,
      imageUrl: user?.imageUrl,
    },
    create: {
      clerkId: userId,
      email: user?.emailAddresses[0]?.emailAddress || '',
      firstName: user?.firstName,
      lastName: user?.lastName,
      imageUrl: user?.imageUrl,
    },
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
