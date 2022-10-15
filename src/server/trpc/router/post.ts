import { authedProcedure, t } from "../trpc";
import { boolean, z } from "zod";
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

      if (!categoryData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This category does not exist.",
        });
      }

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
        createdAt: "desc",
      },
      take: constants.PAGINATION_SIZE,
    });

    return recentPosts.map((post) => ({
      ...post,
      responses: post.comments.length,
    }));
  }),
  addPost: authedProcedure
    .input(
      z.object({
        title: z.string().max(50),
        content: z.string().max(20000),
        categoryId: z.string(),
        tags: z.array(z.string().max(15)).max(3),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const processedTags: string[] = input.tags
        .map((tag) => tag.toLowerCase())
        .filter((val, idx, self) => self.indexOf(val) === idx);

      const postInDb = await ctx.prisma.post.create({
        data: {
          name: input.title,
          content: input.content,
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
          tags: processedTags,
        },
      });

      return postInDb;
    }),
  getPostById: t.procedure
    .input(
      z.object({
        id: z.string(),
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const postInDb = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
        include: {
          comments: {
            skip: (input.page ?? 0) * constants.PAGINATION_SIZE,
            take: constants.PAGINATION_SIZE,
            orderBy: {
              createdAt: "asc",
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              displayName: true,
            },
          },
        },
      });

      return postInDb;
    }),
});
