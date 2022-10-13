import { t, adminProcedure } from "../trpc";

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: adminProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});