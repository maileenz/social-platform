import { type FC } from "react";
import {
  MdOutlineComment,
  MdOutlineMore,
  MdOutlineMoreVert,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Avatar } from "../avatar";
import { Button } from "../button";

export const Post: FC = () => {
  return (
    <div className="card w-full shadow">
      <div className="flex items-center min-h-16 gap-3 px-3">
        <div className="flex items-center gap-3 flex-grow">
          <Avatar />
          <div className="flex flex-col">
            <span className="font-semibold">Cristian</span>
            <time className={"text-sm"}>1 day ago</time>
          </div>
        </div>
        <Button size={"sm"} shape={"circle"} variant={"ghost"}>
          <MdOutlineMoreVert className={"w-5 h-5"} />
        </Button>
      </div>

      <div className="px-4 py-1">
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-2">
        <Button className={"gap-2"} variant={"ghost"}>
          <MdOutlineThumbUp className={"w-5 h-5"} /> Like
        </Button>
        <Button className={"gap-2"} variant={"ghost"}>
          <MdOutlineComment className={"w-5 h-5"} /> Comments
        </Button>
      </div>
    </div>
  );
};
