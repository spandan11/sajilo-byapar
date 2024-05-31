import * as z from "zod";

// export const RegisterFormSchema = z
//   .object({
//     role: z.enum(["OWNER", "MANAGER", "WORKER"]),
//     fullName: z
//       .string({ required_error: "Name is required" })
//       .min(3, { message: "Name must be at least 3 characters" }),
//     email: z.string().email({ message: "Email is invalid" }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters" }),
//     confirmPassword: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });
export const RegisterFormSchema = z.object({
  // role: z.enum(["OWNER", "MANAGER", "WORKER"]),
  fullName: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Email is invalid" }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  storeName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = z.object({
  email: z
    .string({ message: "You forgot to add email" })
    .email({ message: "Email is invalid" }),
  password: z.string({ message: "You forgot to add password" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
