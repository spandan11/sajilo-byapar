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

      console.log(variants);

      // Fetch existing variants
      const existingVariants = await db.variant.findMany({
        where: { productId: productId },
      });

      // Determine variant IDs to delete
      const inputVariantIds = variants.map((variant) => variant.variantId);
      const variantIdsToDelete = existingVariants
        .filter((variant) => !inputVariantIds.includes(variant.id))
        .map((variant) => variant.id);

      // Perform upsert operations
      const upsertOperations = variants.map((variant) => ({
        where: { id: variant.variantId },
        create: {
          productId: productId,
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

      // Execute upsert operations
      await Promise.all(
        upsertOperations.map((operation) => db.variant.upsert(operation)),
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

      // const updatedProduct = await db.product.update({
      //   where: {
      //     id: productId,
      //   },
      //   data: {
      //     name,
      //     description,
      //     variants: {
      //       upsert: variants.map((variant) => ({
      //         where: {
      //           id: variant.variantId, // Ensure this is the unique field
      //         },
      //         create: {
      //           size: variant.size,
      //           color: variant.color,
      //           stock: variant.stock,
      //           price: variant.price,
      //           discount: variant.discount,
      //         },
      //         update: {
      //           size: variant.size,
      //           color: variant.color,
      //           stock: variant.stock,
      //           price: variant.price,
      //           discount: variant.discount,
      //         },
      //       })),
      //     },
      //     storeId: session.user.storeId,
      //     isFeatured,
      //     status,
      //     categoryId,
      //   },
      // });
      console.log("----------------------------------------------");
      console.log(updatedProduct);
      console.log("----------------------------------------------");
      return updatedProduct;
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
