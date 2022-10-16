import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Log in to perform this action.",
    });
  }

  const userData = await ctx.prisma.user.findUnique({
    where: { id: ctx.session?.user?.id },
  });

  if (!userData?.displayName) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Fill data in your profile to perform this action.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  const userData = await ctx.prisma.user.findUnique({
    where: { id: ctx.session?.user?.id },
  });

  if (!ctx.session || !ctx.session.user || userData?.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
