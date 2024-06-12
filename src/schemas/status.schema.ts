import { OrderStatus, PaymentStatus, ProductStatus } from "@/types";
import { ZodType, z } from "zod";

export const ProductStatusSchema: ZodType<ProductStatus> = z.object({
  productId: z.string().min(1),
  status: z.enum(["DRAFTED", "ACTIVE", "ARCHIVED"]),
});

export const OrderStatusSchema: ZodType<OrderStatus> = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "PENDING",
    "PROCESSING",
    "DISPATCHED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ]),
});

export const PaymentStatusSchema: ZodType<PaymentStatus> = z.object({
  orderId: z.string().min(1),
  status: z.enum(["PAID", "UNPAID", "REFUNDED"]),
});

export type ProductStatusSchemaType = z.infer<typeof ProductStatusSchema>;
export type OrderStatusSchemaType = z.infer<typeof OrderStatusSchema>;
export type PaymentStatusSchemaType = z.infer<typeof PaymentStatusSchema>;
