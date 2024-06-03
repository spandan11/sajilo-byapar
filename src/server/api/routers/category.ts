import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { categoryFormSchema } from "@/schemas/category.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(categoryFormSchema)
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
  getallCategories: protectedProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        storeId: ctx.session.user.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  updateCategory: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1), categoryFormSchema }))
    .mutation(async ({ ctx, input }) => {
      const {
        categoryFormSchema: { name, imageUrl },
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
  deleteCategory: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { categoryId } = input;
      const category = await ctx.db.category.findUnique({
        where: {
          id: categoryId,
          storeId: ctx.session.user.storeId,
        },
      });
      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }
      const deletedCategory = await ctx.db.category.delete({
        where: {
          id: categoryId,
          storeId: ctx.session.user.storeId,
        },
      });
      return deletedCategory;
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
