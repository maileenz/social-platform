import type { AppLoadContext, LoaderArgs } from "@remix-run/node";
import { getUserId } from "./session.server";

export type CallbackFunction<TResult> = (
  args: CallbackArgs
) => Promise<TResult>;

type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export interface CallbackArgs {
  req: Request;
  ctx: AppLoadContext;
  params: Params;
  userId?: string;
}

export function createLoader<TResult>(
  callback: CallbackFunction<TResult>
): (args: LoaderArgs) => Promise<TResult> {
  return async (args) => {
    const { request: req, context: ctx, params } = args;

    const userId = await getUserId(req);

    return await callback({ req, ctx, userId, params });
  };
}
