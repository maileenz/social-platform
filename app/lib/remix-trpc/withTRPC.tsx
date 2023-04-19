import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type CreateTRPCClientOptions } from "@trpc/client";
import { createReactQueryHooks, createTRPCReact } from "@trpc/react-query";
import type { AnyRouter } from "@trpc/server";
import { type FC, type ReactElement, useState } from "react";

type QueryClientConfig = ConstructorParameters<typeof QueryClient>[0];

export type WithTRPCConfig<TRouter extends AnyRouter> =
  CreateTRPCClientOptions<TRouter> & {
    queryClientConfig?: QueryClientConfig;
  };

interface WithTRPCOptions<TRouter extends AnyRouter> {
  config: (info: Record<never, never>) => WithTRPCConfig<TRouter>;
}

export interface WithTRPCNoSSROptions<TRouter extends AnyRouter>
  extends WithTRPCOptions<TRouter> {
  ssr?: false;
}

function withTRPC<TRouter extends AnyRouter>(
  opts: WithTRPCNoSSROptions<TRouter>
): (Component: FC) => ReactElement {
  const { config: getClientConfig } = opts;
  const trpc = createTRPCReact<TRouter>() as any;

  return (Component: FC) => {
    const WithTRPC = (props: Record<never, never>) => {
      const [{ queryClient, trpcClient }] = useState(() => {
        const config = getClientConfig({});

        const queryClient = new QueryClient(config.queryClientConfig);

        const trpcClient = trpc.createClient(config);
        return {
          queryClient,
          trpcClient,
        };
      });

      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Component {...props} />
          </QueryClientProvider>
        </trpc.Provider>
      );
    };

    const displayName = Component.displayName || Component.name || "Component";
    WithTRPC.displayName = `withTRPC(${displayName})`;

    return WithTRPC as any;
  };
}

export { withTRPC };
