import { router } from "@/lib/trpc.server";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";
import { recoveryRouter } from "./recovery";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  recovery: recoveryRouter,
  profile: profileRouter,
});
