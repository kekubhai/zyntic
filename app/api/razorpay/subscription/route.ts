import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { razorpay, RAZORPAY_PLANS } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { sendEmail, EMAIL_TEMPLATES } from '@/lib/resend'

// Define a custom type for RazorpaySubscription
interface RazorpaySubscription {
  id: string;
  status: string;
  // Add other relevant fields as needed
}

// Define a custom type for Razorpay subscription creation
interface RazorpaySubscriptionCreateRequestBodyCustom {
  plan_id: string;
  customer_id: string;
  quantity: number;
  total_count: number;
  notes?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planId } = body

    // Validate plan
    const plan = Object.values(RAZORPAY_PLANS).find(p => p.id === planId)
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create Razorpay customer if doesn't exist
    let customerId = user.subscription?.razorpayCustomerId
    
    if (!customerId) {
      const customer = await razorpay.customers.create({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.phone || '',
        notes: {
          userId: user.id,
          clerkId: userId
        }
      })
      customerId = customer.id
    }

    // Create subscription
    const subscription = (await razorpay.subscriptions.create({
      plan_id: planId,
      customer_id: customerId,
      quantity: 1,
      total_count: 12, // 12 months
      notes: {
        userId: user.id,
        planName: plan.name,
      },
    } as RazorpaySubscriptionCreateRequestBodyCustom)) as RazorpaySubscription; // Use custom type

    // Update database
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        razorpayCustomerId: customerId,
        razorpaySubscriptionId: subscription.id,
        status: 'TRIALING',
        planId: plan.id,
        planName: plan.name,
        amount: plan.amount / 100, // Convert from paise to rupees
        currency: plan.currency,
      },
      create: {
        userId: user.id,
        razorpayCustomerId: customerId,
        razorpaySubscriptionId: subscription.id,
        status: 'TRIALING',
        planId: plan.id,
        planName: plan.name,
        amount: plan.amount / 100,
        currency: plan.currency,
      }
    })

    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: `Welcome to ${plan.name} plan!`,
      template: EMAIL_TEMPLATES.SUBSCRIPTION_CREATED as keyof typeof EMAIL_TEMPLATES, // Type assertion
      data: {
        firstName: user.firstName,
        planName: plan.name,
        amount: plan.amount / 100,
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
      }
    })

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id, // Access resolved properties
        status: subscription.status, // Access resolved properties
        planName: plan.name
      }
    })

  } catch (error) {
    console.error('Subscription creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      subscription: user.subscription,
      availablePlans: RAZORPAY_PLANS
    })

  } catch (error) {
    console.error('Failed to fetch subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' }, 
      { status: 500 }
    )
  }
}
