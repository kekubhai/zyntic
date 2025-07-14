import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  INVOICE_CREATED: 'invoice-created',
  INVOICE_PAID: 'invoice-paid',
  PROJECT_UPDATE: 'project-update',
  FILE_UPLOADED: 'file-uploaded',
  SUBSCRIPTION_CREATED: 'subscription-created',
  SUBSCRIPTION_CANCELLED: 'subscription-cancelled',
} as const

interface EmailData {
  to: string
  subject: string
  template: keyof typeof EMAIL_TEMPLATES
  data: Record<string, any>
}

export async function sendEmail({ to, subject, template, data }: EmailData) {
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@zyntic.com',
      to,
      subject,
      html: generateEmailHTML(template, data),
    })
    
    return { success: true, data: result }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

function generateEmailHTML(template: keyof typeof EMAIL_TEMPLATES, data: Record<string, any>): string {
  const baseStyles = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
      .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
      .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
    </style>
  `

  switch (template) {
    case EMAIL_TEMPLATES.WELCOME:
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Welcome to Zyntic!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.firstName},</p>
            <p>Welcome to Zyntic Client Portal! Your account has been successfully created.</p>
            <p>You can now start managing your clients and projects efficiently.</p>
            <a href="${data.dashboardUrl}" class="button">Go to Dashboard</a>
          </div>
        </div>
      `
    case EMAIL_TEMPLATES.INVOICE_CREATED:
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>New Invoice Created</h1>
          </div>
          <div class="content">
            <p>Hi ${data.clientName},</p>
            <p>A new invoice has been created for you:</p>
            <ul>
              <li>Invoice Number: ${data.invoiceNumber}</li>
              <li>Amount: ₹${data.amount}</li>
              <li>Due Date: ${data.dueDate}</li>
            </ul>
            <a href="${data.invoiceUrl}" class="button">View Invoice</a>
          </div>
        </div>
      `
    default:
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Notification from Zyntic</h1>
          </div>
          <div class="content">
            <p>You have a new notification.</p>
          </div>
        </div>
      `
  }
}
