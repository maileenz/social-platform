import { Link } from "@remix-run/react";
import { type FC } from "react";
import { button } from "../../../components/button";
import { MdOutlinePerson } from "react-icons/md";
import { BaseNavbar, type NavbarProps } from "./base-navbar";

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <BaseNavbar {...props}>
      <Link
        to={"/login"}
        className={button({ variant: "ghost", shape: "circle" })}
      >
        <MdOutlinePerson className={"w-6 h-6"} />
      </Link>
    </BaseNavbar>
  );
};
