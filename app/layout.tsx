import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zyntic - Client Portal',
  description: 'Professional client portal for freelancers and agencies',
  keywords: ['client portal', 'project management', 'freelancer', 'agency', 'India'],
  authors: [{ name: 'Zyntic Team' }],
  openGraph: {
    title: 'Zyntic - Client Portal',
    description: 'Professional client portal for freelancers and agencies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
     </ClerkProvider>
  )
}
