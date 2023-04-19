import { procedure, router } from "@/lib/trpc.server";
import { z } from "zod";

export const recoveryRouter = router({
  sendEmail: procedure.input(z.string().email()).mutation(async () => {}),
});
