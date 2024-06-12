import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  ProductStatusSchema,
  OrderStatusSchema,
  PaymentStatusSchema,
} from "@/schemas/status.schema";

export const statusRouter = createTRPCRouter({
  changeProductStatus: protectedProcedure
    .input(ProductStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId, status } = input;
      const product = await ctx.db.product.findFirst({
        where: {
          id: productId,
          storeId: ctx.session.user.storeId,
        },
      });
      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const updatedProduct = await ctx.db.product.update({
        where: { id: productId },
        data: {
          status: status,
        },
      });
      return updatedProduct;
    }),
  changeOrderStatus: protectedProcedure
    .input(OrderStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const { orderId, status } = input;
      const product = await ctx.db.order.findFirst({
        where: {
          id: orderId,
          storeId: ctx.session.user.storeId,
        },
      });
      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const updatedProduct = await ctx.db.order.update({
        where: { id: orderId },
        data: {
          orderStatus: status,
        },
      });
      return updatedProduct;
    }),
  changePaymentStatus: protectedProcedure
    .input(PaymentStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const { orderId, status } = input;
      const product = await ctx.db.order.findFirst({
        where: {
          id: orderId,
          storeId: ctx.session.user.storeId,
        },
      });
      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const updatedProduct = await ctx.db.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: status,
        },
      });
      return updatedProduct;
    }),
});
