import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns'

export function formatDate(date: Date | string, formatStr: string = 'dd MMM yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'dd MMM yyyy, hh:mm a')
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'hh:mm a')}`
  }
  
  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'hh:mm a')}`
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

export function getFinancialYear(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = date.getMonth()
  
  // Indian financial year starts from April
  if (month >= 3) { // April = 3 (0-indexed)
    return `${year}-${year + 1}`
  } else {
    return `${year - 1}-${year}`
  }
}

export function isDateInCurrentFinancialYear(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const currentFY = getFinancialYear()
  const dateFY = getFinancialYear(dateObj)
  return currentFY === dateFY
}
