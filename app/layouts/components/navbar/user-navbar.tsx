import { type FC } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { BaseNavbar, type NavbarProps } from "./base-navbar";
import { useUserActivities } from "@/layouts";
import { Menu, MenuButton, MenuContent, MenuItem } from "@/components/menu";
import { Avatar } from "@/components/avatar";
import { useAuth } from "@/hooks/use-auth";

export const UserNavbar: FC<NavbarProps> = (props) => {
  const { onOpen } = useUserActivities();

  const { user, logout } = useAuth();

  return (
    <BaseNavbar {...props}>
      <Menu>
        <MenuButton
          className="w-10 max-h-10"
          variant={"ghost"}
          shape={"circle"}
        >
          <Avatar className="w-10" />
        </MenuButton>
        <MenuContent sideOffset={5}>
          <MenuItem icon={MdOutlinePerson}>Profile</MenuItem>
          <MenuItem icon={MdOutlinePerson}>Profile</MenuItem>
          <MenuItem icon={MdOutlinePerson} onClick={() => logout.mutate()}>
            Logout
          </MenuItem>
        </MenuContent>
      </Menu>
    </BaseNavbar>
  );
};
