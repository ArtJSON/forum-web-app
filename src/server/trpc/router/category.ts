import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { constants } from "../../../utils/constants";
import { adminProcedure, t } from "../trpc";

export const categoryRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    const categoryData = await ctx.prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    // TODO: Refactor, unnecessary returns posts

    return categoryData.map((a) => ({
      ...a,
      posts: a.posts.length,
    }));
  }),
  getCategoryById: t.procedure
    .input(
      z.object({
        id: z.string(),
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const categoryInDb = await ctx.prisma.category.findUnique({
        where: {
          id: input.id,
        },
        include: {
          posts: {
            skip: (input.page ?? 0) * constants.PAGINATION_SIZE,
            take: constants.PAGINATION_SIZE,
          },
        },
      });

      if (!categoryInDb) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This category does not exist.",
        });
      }

      return {
        ...categoryInDb,
        pages: categoryInDb.posts.length / constants.PAGINATION_SIZE + 1,
      };
    }),
  addCategory: adminProcedure
    .input(
      z.object({
        name: z.string().max(50),
        description: z.string().max(200),
        image: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const categoryInDb = await ctx.prisma.category.create({
        data: {
          description: input.description,
          name: input.name,
          image: input.image,
        },
      });

      return categoryInDb;
    }),
});
