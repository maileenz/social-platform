import { type FC } from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import type { ImageAttributes } from "@/types";

const wrapper = cva("", {
  variants: {
    status: {
      online: "online",
      offline: "offline",
    },
  },
});

const avatar = cva("", {
  variants: {
    size: {
      sm: "w-8",
      md: "w-12",
      lg: "w-16",
      xl: "w-24",
    },
    variant: {
      circle: "rounded-full",
      story:
        "rounded-full ring ring-primary ring-offset-base-100 ring-offset-2",
      squircle: "mask mask-squircle",
      hexagon: "mask mask-hexagon",
      triangle: "mask mask-triangle",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "circle",
  },
});

export interface AvatarProps
  extends ImageAttributes,
    VariantProps<typeof wrapper>,
    VariantProps<typeof avatar> {}

export const Avatar: FC<AvatarProps> = (props) => {
  const { src, status, size, variant, className, ...rest } = props;

  return (
    <div className={cx("avatar", wrapper({ status }))}>
      <div className={avatar({ size, variant, className })}>
        <img src={src ?? "https://picsum.photos/200"} {...rest} />
      </div>
    </div>
  );
};
