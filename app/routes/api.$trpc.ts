import { appRouter } from "@/api";
import { createTRPCHandler } from "@/lib/remix-trpc";
import { createContext } from "@/lib/trpc.server";
import { type AppRouter } from "@/types";

export const { loader, action } = createTRPCHandler<AppRouter>({
  createContext,
  router: appRouter,
});
