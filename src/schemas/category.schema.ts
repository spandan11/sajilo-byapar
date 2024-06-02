import { Category } from "@/types";
import { ZodType, z } from "zod";

export const categoryFormSchema: ZodType<Category> = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().optional(),
});

export type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;
