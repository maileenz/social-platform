import { z } from "zod";
import { protectedProcedure, router } from "@/lib/trpc.server";

export const profileRouter = router({
  get: protectedProcedure
    .input(z.string())
    .query(async ({ input: userId, ctx: { prisma } }) => {
      const profile = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return profile;
    }),
});
