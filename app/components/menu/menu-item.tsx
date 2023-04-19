import type { ButtonAttributes } from "@/types";
import { cx } from "class-variance-authority";
import { type FC } from "react";
import { IconType } from "react-icons";

export interface MenuItemProps extends ButtonAttributes {
  icon?: IconType;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { icon, className, children, ...rest } = props;

  const IconComponent = icon;

  return (
    <button
      className={cx(className, "flex items-center py-2 px-4 gap-3 w-full")}
      {...rest}
    >
      {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
      {children}
    </button>
  );
};
