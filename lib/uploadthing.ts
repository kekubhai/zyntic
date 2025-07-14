import { createUploadthing, type FileRouter } from "uploadthing/next"
import { currentUser } from "@clerk/nextjs"

const f = createUploadthing()

export const ourFileRouter = {
  fileUploader: f({ 
    "image": { maxFileSize: "4MB", maxFileCount: 10 },
    "pdf": { maxFileSize: "16MB", maxFileCount: 5 },
    "text": { maxFileSize: "1MB", maxFileCount: 10 },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      
      if (!user) throw new Error("Unauthorized")
      
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
      
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
