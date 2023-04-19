import { setUserId } from "@/lib/session.server";
import { protectedProcedure, procedure, router } from "../lib/trpc.server";
import bcrypt from "bcrypt";
import {
  loginInputValidation,
  registerInputValidation,
} from "@/lib/validation";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  user: procedure.query(async ({ ctx: { userId, prisma } }) => {
    if (!userId) return null;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        avatarHash: true,
        avatarUrl: true,
        name: true,
        surname: true,
        email: true,
        confirmedAt: true,
      },
    });

    return user;
  }),

  login: procedure
    .input(loginInputValidation)
    .mutation(
      async ({
        input: { email, password, rememberMe },
        ctx: { req, prisma },
      }) => {
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
            hash: true,
          },
        });

        if (!user)
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Credentials are wrong.",
          });

        const validPassword = await bcrypt.compare(password, user.hash);

        if (!validPassword)
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Credentials are wrong.",
          });

        await setUserId(req, user.id);
      }
    ),

  logout: protectedProcedure.mutation(async () => {
    return "pula";
  }),

  register: procedure
    .input(registerInputValidation)
    .mutation(
      async ({
        input: { name, surname, email, password, dateOfBirth, gender },
        ctx: { req, prisma },
      }) => {
        const existingUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (existingUser)
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email is already in use",
          });

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
          data: {
            name,
            surname,
            email,
            hash,
            dateOfBirth: new Date(dateOfBirth),
            gender,
          },
        });

        await setUserId(req, user.id);
      }
    ),
});
