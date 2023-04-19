import { Post } from "@/components/post";
import { Container } from "@/components/container";
import { FriendsStories } from "@/components/friends-stories";
import type { V2_MetaFunction } from "@remix-run/react";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getUserId } from "@/lib/session.server";

export const meta: V2_MetaFunction = () => [{ title: "New Remix App" }];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (!userId) return redirect("/login");

  return null;
};

export default function Feed() {
  return (
    <Container size={"2xl"} className={"flex flex-col flex-grow py-4 gap-3"}>
      <FriendsStories />

      <Post />
    </Container>
  );
}
