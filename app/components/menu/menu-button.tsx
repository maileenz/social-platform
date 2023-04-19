import { type PopoverTriggerProps, Trigger } from "@radix-ui/react-popover";
import { type VariantProps } from "class-variance-authority";
import { type FC, forwardRef } from "react";
import { button } from "../button";

export interface MenuButtonProps
  extends PopoverTriggerProps,
    VariantProps<typeof button> {}

export const MenuButton: FC<MenuButtonProps> = forwardRef<
  HTMLButtonElement,
  MenuButtonProps
>((props, ref) => {
  const {
    className,
    colorScheme,
    variant,
    animations,
    shape,
    size,
    state,
    ...rest
  } = props;

  return (
    <Trigger
      className={button({
        className,
        colorScheme,
        variant,
        animations,
        shape,
        size,
        state,
      })}
      {...rest}
      ref={ref}
    />
  );
});
