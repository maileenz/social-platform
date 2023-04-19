import { AppRouter } from "@/types";
import { httpBatchLink } from "@trpc/client";
import { createTRPCRemix } from "./remix-trpc";

export const { trpc, trpcProxy, withTRPC } = createTRPCRemix<AppRouter>({
  config: () => ({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api",
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
      }),
    ],
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchOnWindowFocus: "always",
          networkMode: "always",
        },
        mutations: {
          networkMode: "always",
        },
      },
    },
  }),
});
