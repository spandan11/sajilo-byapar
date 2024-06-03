import { string, z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { productFormSchema } from "@/schemas/product.schema";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  // checkProduct: protectedProcedure
  //   .input(z.object({ productId: z.string() }))
  //   .output(productFormSchema)
  //   .query(async ({ input, ctx }) => {
  //     const { productId } = input;
  //     const { db } = ctx;
  //     const product = await db.product.findFirst({
  //       where: {
  //         id: productId,
  //       },
  //       include: {
  //         variants: true,
  //         Store: {
  //           include: {
  //             categories: true,
  //           },
  //         },
  //       },
  //     });
  //     if (!product) {
  //       throw new TRPCError({ code: "NOT_FOUND" });
  //     }

  //     console.log(product)
  //     // const data = await db.store.findFirst({
  //     //   where: {
  //     //     id: product.storeId,
  //     //     products: {
  //     //       some: {
  //     //         id: productId,
  //     //       },
  //     //     },
  //     //   },
  //     //   include: {
  //     //     products: {
  //     //       select: {
  //     //         variants: true,
  //     //       },
  //     //     },
  //     //     categories: true,
  //     //   },
  //     // });
  //     if (!data) {
  //       throw new TRPCError({ code: "NOT_FOUND" });
  //     }
  //     return data;
  //   }),
  getallProducts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      where: {
        storeId: ctx.session.user.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        variants: true,
      },
    });
  }),
  createProduct: protectedProcedure
    .input(productFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { name, description, variants, categoryId, isFeatured, status } =
        input;

      const newProduct = await db.product.create({
        data: {
          name,
          description,
          variants: {
            create: variants.map((variant) => ({
              size: variant.size,
              color: variant.color,
              stock: variant.stock,
              price: variant.price,
              discount: variant.discount,
            })),
          },
          storeId: session.user.storeId,
          isFeatured,
          status,
          categoryId,
        },
      });
      return newProduct;
      // return ctx.db.product.create({
      //   data: {
      //     name: input.name,
      //     createdBy: { connect: { id: ctx.session.user.id } },
      //   },
      // });
    }),
  updateProduct: protectedProcedure
    .input(z.object({ productId: z.string().min(1), productFormSchema }))
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const {
        productFormSchema: {
          name,
          description,
          variants,
          categoryId,
          isFeatured,
          status,
        },
        productId,
      } = input;

      // Fetch existing variants
      const existingVariants = await db.variant.findMany({
        where: { productId: productId },
      });

      // Determine variant IDs to delete
      const inputVariantIds = variants
        .map((variant) => variant.id)
        .filter((id) => id);
      const variantIdsToDelete = existingVariants
        .filter((variant) => !inputVariantIds.includes(variant.id))
        .map((variant) => variant.id);

      // Separate existing and new variants
      const existingVariantsOps = variants.filter((variant) => variant.id); // filtering out the variants that has id init sended from frontend... aako variant ma id vako ra navako (to create or check it exist in db)
      const newVariantsOps = variants.filter((variant) => !variant.id); //filtering out the new variants without id

      // Perform upsert operations for existing variants
      const upsertOperations = existingVariantsOps.map((variant) => ({
        where: { id: variant.id, productId },
        create: {
          productId,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          price: variant.price,
          discount: variant.discount,
        },
        update: {
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          price: variant.price,
          discount: variant.discount,
        },
      }));

      // Perform create operations for new variants
      const createOperations = newVariantsOps.map((variant) => ({
        productId,
        size: variant.size,
        color: variant.color,
        stock: variant.stock,
        price: variant.price,
        discount: variant.discount,
      }));

      // Execute upsert operations
      await Promise.all(
        upsertOperations.map((operation) => db.variant.upsert(operation)),
      );

      // Execute create operations
      await Promise.all(
        createOperations.map((variant) => db.variant.create({ data: variant })),
      );

      // Delete missing variants
      if (variantIdsToDelete.length > 0) {
        await db.variant.deleteMany({
          where: { id: { in: variantIdsToDelete } },
        });
      }

      // Update the product
      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          storeId: session.user.storeId,
          isFeatured,
          status,
          categoryId,
        },
      });
      return updatedProduct;
    }),
  deleteProduct: protectedProcedure
    .input(z.object({ productId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const product = await ctx.db.product.findFirst({
        where: {
          id: productId,
          storeId: ctx.session.user.storeId,
        },
      });
      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const deletedProduct = await ctx.db.product.delete({
        where: {
          id: productId,
          storeId: ctx.session.user.storeId,
        },
      });
      return deletedProduct;
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
