import { ZodType, z } from "zod";
import { ProductFormSchema } from "@/schemas/product.schema";
import type { Order } from "@/types";

export const OrderFormSchema: ZodType<Order> = z.object({
  id: z.string().optional(),
  customerName: z.string(),
  customerAddress: z.string(),
  amount: z.number().positive(),
  quantity: z.number().positive(),
  discount: z.number().optional(),
  paymentMethod: z.enum([
    "CREDIT_CARD",
    "ESEWA",
    "KHALTI",
    "BANK_TRANSFER",
    "CASH_ON_DELIVERY",
  ]),
  paymentStatus: z.enum(["PAID", "UNPAID", "REFUNDED"]),
  orderStatus: z.enum([
    "PENDING",
    "PROCESSING",
    "DISPATCHED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ]),
  product: z.array(ProductFormSchema),
  createdAt: z.date().optional(),
});

export type OrderFormSchemaType = z.infer<typeof OrderFormSchema>;
