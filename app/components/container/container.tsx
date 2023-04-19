import type { DivAttributes } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { type FC } from "react";

export const container = cva("w-full px-4", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      full: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ContainerProps
  extends DivAttributes,
    VariantProps<typeof container> {}

export const Container: FC<ContainerProps> = (props) => {
  const { size, className, ...rest } = props;

  return <div className={container({ size, className })} {...rest} />;
};
