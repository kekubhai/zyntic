import { User, Client, Project, Invoice, Workspace, File, Update, Subscription } from '@prisma/client'

export type UserWithRelations = User & {
  clients: Client[]
  projects: Project[]
  invoices: Invoice[]
  workspaces: Workspace[]
  subscription: Subscription | null
}

export type ClientWithProjects = Client & {
  projects: Project[]
  workspaces: Workspace[]
  invoices: Invoice[]
}

export type ProjectWithRelations = Project & {
  client: Client
  workspace: Workspace | null
  invoices: Invoice[]
  updates: Update[]
}

export type WorkspaceWithRelations = Workspace & {
  client: Client
  project: Project
  files: File[]
  updates: Update[]
}

export type InvoiceWithItems = Invoice & {
  client: Client
  project: Project | null
  items: InvoiceItem[]
}

export type { 
  User, 
  Client, 
  Project, 
  Invoice, 
  Workspace, 
  File, 
  Update, 
  Subscription,
  InvoiceItem 
} from '@prisma/client'
