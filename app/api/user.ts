import { procedure, router } from "@/lib/trpc.server";

export const userRouter = router({
  get: procedure.query(async ({ ctx: { prisma } }) => {
    const user = await prisma.user.findFirst({
      where: {
        id: "e3ab66be-689b-48ef-a43e-4fb1c971426d",
      },
    });

    return user;
  }),
});
