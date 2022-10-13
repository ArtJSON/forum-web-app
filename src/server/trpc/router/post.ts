import { t } from "../trpc";
import { z } from "zod";
import { constants } from "../../../utils/constants";
import { TRPCError } from "@trpc/server";

export const postRouter = t.router({
  getAllForCategoryId: t.procedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const categoryData = await ctx.prisma.category.findUnique({
        where: {
          id: input.categoryId,
        },
        include: {
          posts: {
            orderBy: {
              updatedAt: "asc",
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

      if (!categoryData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This category does not exist.",
        });
      }

      // id, name, tags, lastResponse, likes, responses, views

      return {
        ...categoryData,
        posts: categoryData.posts.map((post) => ({
          ...post,
          responses: post.comments.length,
        })),
      };
    }),
  getRecent: t.procedure.query(async ({ ctx }) => {
    const recentPosts = await ctx.prisma.post.findMany({
      include: {
        comments: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: constants.PAGINATION_SIZE,
    });

    return recentPosts.map((post) => ({
      ...post,
      responses: post.comments.length,
    }));
  }),
});
