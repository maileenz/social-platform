import { cx } from "class-variance-authority";
import { type FC, type HTMLAttributes, forwardRef } from "react";

interface ModalContentProps extends HTMLAttributes<HTMLParagraphElement> {}

export const ModalContent: FC<ModalContentProps> = forwardRef<
  HTMLParagraphElement,
  ModalContentProps
>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} className={cx(className, "py-1 px-4")} {...rest} />;
});
