import { type LoaderArgs } from "@remix-run/node";
import { initTRPC, TRPCError, type inferAsyncReturnType } from "@trpc/server";
import { prisma } from "./prisma";
import { getUserId } from "./session.server";

export const createContext = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  return { req: request, userId, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const middleware = t.middleware;

export const procedure = t.procedure;

const isAuth = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx,
  });
});

export const protectedProcedure = procedure.use(isAuth);
