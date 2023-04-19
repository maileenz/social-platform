import { Container } from "@/components/container";
import { WorldMap } from "@/components/world-map";
import { getUserId } from "@/lib/session.server";
import { type LoaderArgs, redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "New Remix App" }];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (userId) return redirect("/feed");

  return null;
};

export default function Index() {
  return (
    <Container size={"4xl"} className={"flex-grow py-4"}>
      <div className={"flex items-center gap-6"}>
        <WorldMap />
        <h1>Welcome to Remix</h1>
      </div>
    </Container>
  );
}
