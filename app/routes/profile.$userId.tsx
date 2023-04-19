import { getUserId } from "@/lib/session.server";
import { trpcProxy } from "@/lib/trpc";
import { type LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (!userId) return redirect("/");

  const profile = await trpcProxy.profile.get.query(params.userId!);

  return { profile };
};

export const useProfileLoaderData = () => useLoaderData<typeof loader>();

export default function Profile() {
  return <>PRofile</>;
}
