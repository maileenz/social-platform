import {
  type CreateTRPCReact,
  createTRPCReact,
  createTRPCProxyClient,
} from "@trpc/react-query";
import type { AnyRouter } from "@trpc/server";
import type { FC, JSXElementConstructor, ReactElement } from "react";
import { type WithTRPCNoSSROptions, withTRPC } from "./withTRPC";

export function createTRPCRemix<TRouter extends AnyRouter>(
  opts: WithTRPCNoSSROptions<TRouter>
): CreateTRPCRemixReturn<TRouter> {
  const trpc = createTRPCReact<TRouter>();
  const trpcProxy = createTRPCProxyClient<TRouter>(opts.config({}));

  const _withTRPC = withTRPC<TRouter>(opts);

  return {
    trpc,
    trpcProxy,
    withTRPC: _withTRPC,
  };
}

interface CreateTRPCRemixReturn<TRouter extends AnyRouter> {
  trpc: CreateTRPCReact<TRouter, unknown, null>;
  trpcProxy: ReturnType<typeof createTRPCProxyClient<TRouter>>;
  withTRPC: (
    Component: FC<{}>
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
}
