import { Link } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { button } from "../../../components/button";
import { BsDropletHalf } from "react-icons/bs";
import { type FC, type HTMLAttributes } from "react";

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export const BaseNavbar: FC<NavbarProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={cx(className, "navbar sticky top-0 bg-base-100 shadow")}
      {...rest}
    >
      <div className="flex-1">
        <Link
          to={"/"}
          className={cx(
            "normal-case text-xl gap-2",
            button({ variant: "ghost" })
          )}
        >
          <BsDropletHalf className={"w-6 h-6 text-primary"} />
          Drop
        </Link>
      </div>
      <div className="flex-none pr-2">{children}</div>
    </div>
  );
};
