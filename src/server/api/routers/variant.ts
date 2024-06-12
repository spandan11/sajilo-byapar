import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CategoryFormSchema } from "@/schemas/category.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const variantRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(CategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { name, imageUrl } = input;
      const newcategory = await db.category.create({
        data: {
          storeId: session.user.storeId,
          name,
          imageUrl,
        },
      });
      return newcategory;
    }),
  getallVariants: protectedProcedure.query(({ ctx }) => {
    return ctx.db.variant.findMany({
      where: {
        productId: ctx.session.user.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  updateCategory: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1), CategoryFormSchema }))
    .mutation(async ({ ctx, input }) => {
      const {
        CategoryFormSchema: { name, imageUrl },
        categoryId,
      } = input;
      const category = await ctx.db.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
          imageUrl,
          //   imageUrl as string,
        },
      });
      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }
      return category;
    }),
});
//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
