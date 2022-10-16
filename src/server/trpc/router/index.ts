// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { postRouter } from "./post";
import { profileRouter } from "./profile";

export const appRouter = t.router({
  auth: authRouter,
  category: categoryRouter,
  post: postRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
