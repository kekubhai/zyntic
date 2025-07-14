import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const RAZORPAY_PLANS = {
  BASIC: {
    id: 'plan_basic_monthly',
    name: 'Basic',
    amount: 99900, // ₹999 in paise
    currency: 'INR',
    interval: 1,
    interval_type: 'month',
    features: ['5 Clients', '10 Projects', '5GB Storage', 'Email Support'],
  },
  PRO: {
    id: 'plan_pro_monthly',
    name: 'Pro',
    amount: 199900, // ₹1999 in paise
    currency: 'INR',
    interval: 1,
    interval_type: 'month',
    features: ['25 Clients', '50 Projects', '50GB Storage', 'Priority Support', 'Custom Branding'],
  },
  ENTERPRISE: {
    id: 'plan_enterprise_monthly',
    name: 'Enterprise',
    amount: 499900, // ₹4999 in paise
    currency: 'INR',
    interval: 1,
    interval_type: 'month',
    features: ['Unlimited Clients', 'Unlimited Projects', '500GB Storage', '24/7 Support', 'White Label', 'API Access'],
  },
} as const

export type PlanType = keyof typeof RAZORPAY_PLANS
