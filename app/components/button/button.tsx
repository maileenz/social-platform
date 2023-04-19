import { forwardRef, type FC } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type { ButtonAttributes } from "@/types";

export const button = cva("btn", {
  variants: {
    colorScheme: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
      glass: "glass",
    },
    variant: {
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
    state: {
      active: "btn-active",
      disabled: "btn-disabled",
      loading: "loading",
    },
    animations: {
      default: "",
      none: "no-animation",
    },
    shape: {
      block: "btn-block",
      circle: "btn-circle",
      square: "btn-square",
    },
  },
  defaultVariants: {
    size: "md",
    animations: "none",
  },
});

export interface ButtonProps
  extends ButtonAttributes,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      colorScheme,
      variant,
      state,
      size,
      animations,
      shape,
      isLoading,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cx(
        button({
          colorScheme,
          variant,
          size,
          state,
          shape,
          animations,
          className,
        }),
        isLoading ? "loading" : ""
      )}
      {...props}
    />
  )
);
