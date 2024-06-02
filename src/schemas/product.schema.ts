import { Product } from "@/types";
import { ZodType, z } from "zod";

export const productFormSchema: ZodType<Product> = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  variants: z.array(
    z.object({
      variantId: z.string().optional(),
      size: z.enum(["S", "M", "L", "XL", "XXL"]),
      color: z.enum(["RED", "BLUE", "GREEN", "WHITE", "BLACK", "ORANGE"]),
      stock: z.coerce.number().positive("Stock quantity is required"),
      price: z.coerce.number().positive("Price must be greater than 0"),
      discount: z.coerce.number().optional(),
    }),
  ),
  categoryId: z.string().optional(),
  status: z.enum(["ARCHIVED", "DRAFTED", "ACTIVE"]),
  isFeatured: z.boolean().optional(),
  allowOrderWhenEmpty: z.boolean(),
  // quantity: z.coerce.number().optional(),
  createdAt: z.date().optional(),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
