# Zyntic - Client Portal SaaS

A comprehensive client portal solution built specifically for Indian freelancers and agencies. Manage clients, projects, invoices, and communications all in one beautiful, secure platform.

## 🚀 Features

- **Client Management**: Organize and manage client information with detailed profiles
- **Project Workspaces**: Dedicated spaces for each client with file sharing and updates
- **Invoice Management**: GST-compliant invoicing with Razorpay integration
- **File Sharing**: Secure file uploads and sharing with clients
- **Real-time Updates**: Keep clients informed with project updates
- **Subscription Billing**: Flexible pricing plans with Razorpay integration
- **Email Notifications**: Automated emails for important events
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Razorpay (India-focused)
- **File Storage**: UploadThing
- **Email**: Resend
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zyntic-client-portal.git
   cd zyntic-client-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - Clerk authentication keys
   - Database connection string
   - Razorpay API keys
   - Resend API key
   - UploadThing configuration

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
zyntic/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── razorpay/      # Payment handling
│   │   ├── uploadthing/   # File upload
│   │   └── notifications/ # Email notifications
│   ├── dashboard/         # Main application
│   │   ├── [workspaceId]/ # Dynamic workspace routes
│   │   ├── clients/       # Client management
│   │   ├── projects/      # Project management
│   │   ├── invoices/      # Invoice management
│   │   └── settings/      # User settings
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── Header.tsx        # Dashboard header
│   └── ...               # Feature components
├── lib/                   # Utilities and configurations
│   ├── prisma.ts         # Database client
│   ├── razorpay.ts       # Payment configuration
│   ├── resend.ts         # Email configuration
│   └── uploadthing.ts    # File upload configuration
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/zyntic_db"
DIRECT_URL="postgresql://username:password@localhost:5432/zyntic_db"

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourapp.com

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

1. Create a PostgreSQL database
2. Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Razorpay Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoints for payment notifications
4. Configure your subscription plans

## 📱 Features Overview

### For Freelancers/Agencies
- **Dashboard**: Overview of clients, projects, and revenue
- **Client Management**: Add and manage client profiles
- **Project Workspaces**: Create dedicated spaces for each project
- **Invoice Generation**: Create and send professional invoices
- **File Sharing**: Upload and share files securely
- **Project Updates**: Keep clients informed with regular updates
- **Payment Tracking**: Monitor invoice payments and revenue

### For Clients
- **Workspace Access**: View project progress and files
- **File Downloads**: Access shared project files
- **Invoice Payments**: Pay invoices directly through Razorpay
- **Project Updates**: Stay informed about project progress
- **Communication**: Direct communication with service providers

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy**: Vercel will automatically deploy your application

### Database Deployment

We recommend using:
- **Supabase**: PostgreSQL with built-in features
- **PlanetScale**: Serverless MySQL platform
- **Railway**: Simple PostgreSQL hosting

## 📄 API Documentation

### Authentication
All API routes require authentication via Clerk session tokens.

### Key Endpoints

- `GET /api/clients` - Get user's clients
- `POST /api/clients` - Create new client
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `POST /api/razorpay/subscription` - Create subscription
- `POST /api/uploadthing` - Upload files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://zyntic-demo.vercel.app)
- [Documentation](https://docs.zyntic.com)
- [Support](mailto:support@zyntic.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.dev/) for seamless authentication
- [Prisma](https://prisma.io/) for excellent database tooling
- [Razorpay](https://razorpay.com/) for Indian payment processing
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for seamless deployment

---

Built with ❤️ for the Indian freelancer community
