import { adminProcedure, authedProcedure, t } from "../trpc";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

export const categoryRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    return res.map((a) => ({
      ...a,
      posts: a.posts.length,
    }));
  }),
  addPost: adminProcedure
    .input(
      z.object({
        name: z.string().max(50),
        description: z.string().max(200),
        image: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const categoryInDb = await prisma.category.create({
        data: {
          description: input.description,
          name: input.name,
          image: input.image,
          userId: ctx.session.user.id,
        },
      });

      return categoryInDb;
    }),
});
