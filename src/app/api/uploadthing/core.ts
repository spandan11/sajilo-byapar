import { getServerAuthSession } from "@/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/server/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "16MB" },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerAuthSession();

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return session.user;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await db.media.create({
        data: {
          key: file.key,
          name: file.name,
          url: file.url,
          storeId: metadata.storeId,
        },
      });
      //   await db.file.create({
      //     data: {
      //       name: file.name,
      //       url: file.url,
      //       key: file.key,
      //       format: file.type,
      //       size: file.size,
      //       clerkUserId: metadata.userId,
      //     },
      //   });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        userId: metadata.id,
        storeId: metadata.storeId,
        file,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
