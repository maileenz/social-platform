import { type FC } from "react";
import { Avatar } from "../avatar";

export const FriendsStories: FC = () => {
  return (
    <div className="flex gap-5 p-2 overflow-x-auto">
      <Avatar variant={"story"} />
      <Avatar variant={"story"} />
      <Avatar variant={"story"} />
      <Avatar variant={"story"} />
      <Avatar variant={"story"} />
      <Avatar variant={"story"} />
    </div>
  );
};
