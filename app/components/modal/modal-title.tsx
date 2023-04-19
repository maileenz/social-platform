import { cx } from "class-variance-authority";
import { type FC, type HTMLAttributes, forwardRef } from "react";

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const ModalTitle: FC<ModalTitleProps> = forwardRef<
  HTMLHeadingElement,
  ModalTitleProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx(
        className,
        "flex items-center font-bold text-lg min-h-16 px-4"
      )}
      {...rest}
    />
  );
});
