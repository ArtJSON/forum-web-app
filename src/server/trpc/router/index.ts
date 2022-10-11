// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";

export const appRouter = t.router({
  auth: authRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
