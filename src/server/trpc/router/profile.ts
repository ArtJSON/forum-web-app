import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../trpc";

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
});
