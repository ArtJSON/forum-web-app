import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { authedProcedure, t } from "../trpc";

export const profileRouter = t.router({
  getProfileById: t.procedure
    .input(
      z.object({
        id: z.string(),
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profileInDb = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          posts: {
            orderBy: {
              lastComment: "desc",
            },
            include: {
              comments: {
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
          },
        },
      });

      if (!profileInDb) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This user does not exist.",
        });
      }

      return {
        ...profileInDb,
        posts: profileInDb.posts.map((post) => ({
          ...post,
          responses: post.comments.length,
        })),
      };
    }),
  updateProfileData: t.procedure
    .input(
      z.object({
        displayName: z.string().max(50),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Log in to perform this action.",
        });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          displayName: input.displayName,
        },
      });
    }),
});
