import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "@/server/api/routers/product";
import { categoryRouter } from "@/server/api/routers/category";
import { variantRouter } from "@/server/api/routers/variant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  product: productRouter,
  category: categoryRouter,
  variant: variantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
