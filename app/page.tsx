import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, FileText, BarChart3, Shield } from 'lucide-react'

export default function HomePage() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Zyntic</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Professional Client Portal
            <span className="block text-blue-600">for Indian Freelancers</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your client relationships with a beautiful, secure portal. 
            Manage projects, invoices, and communications all in one place.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/sign-up">
                <Button size="lg" className="w-full flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize all your clients and their projects in dedicated workspaces.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">File Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure file uploads and sharing with automatic organization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">Invoice Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and send professional invoices with Razorpay integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bank-grade security with automatic backups and 99.9% uptime.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Perfect for Indian freelancers and agencies</p>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-lg">Basic</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹999</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 5 Clients</li>
                  <li>• 10 Projects</li>
                  <li>• 5GB Storage</li>
                  <li>• Email Support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative border-blue-500 border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Pro</CardTitle>
                <CardDescription>Best for growing agencies</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹1,999</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 25 Clients</li>
                  <li>• 50 Projects</li>
                  <li>• 50GB Storage</li>
                  <li>• Priority Support</li>
                  <li>• Custom Branding</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-lg">Enterprise</CardTitle>
                <CardDescription>For large agencies</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹4,999</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Unlimited Clients</li>
                  <li>• Unlimited Projects</li>
                  <li>• 500GB Storage</li>
                  <li>• 24/7 Support</li>
                  <li>• White Label</li>
                  <li>• API Access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to get started?</h2>
          <p className="mt-4 text-lg text-gray-600">Join hundreds of Indian freelancers already using Zyntic</p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Zyntic</h3>
            <p className="mt-2 text-gray-400">Professional client portal for Indian freelancers</p>
            <div className="mt-4 text-sm text-gray-400">
              © 2024 Zyntic. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
