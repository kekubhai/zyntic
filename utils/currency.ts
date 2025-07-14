/**
 * Format currency for Indian market
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'INR', 
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format Indian Rupees with proper formatting
 */
export function formatINR(amount: number): string {
  return formatCurrency(amount, 'INR', 'en-IN')
}

/**
 * Convert paise to rupees
 */
export function paiseToRupees(paise: number): number {
  return paise / 100
}

/**
 * Convert rupees to paise
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100)
}

/**
 * Format amount in compact notation (1K, 1L, 1Cr)
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 10000000) { // 1 Crore
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  } else if (amount >= 100000) { // 1 Lakh
    return `₹${(amount / 100000).toFixed(1)}L`
  } else if (amount >= 1000) { // 1 Thousand
    return `₹${(amount / 1000).toFixed(1)}K`
  } else {
    return formatINR(amount)
  }
}

/**
 * Calculate GST amount (18% default)
 */
export function calculateGST(amount: number, gstRate: number = 18): number {
  return (amount * gstRate) / 100
}

/**
 * Calculate total amount including GST
 */
export function calculateTotalWithGST(amount: number, gstRate: number = 18): number {
  return amount + calculateGST(amount, gstRate)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}
