import { cx } from "class-variance-authority";
import { type FC, type HTMLAttributes, forwardRef } from "react";

interface ModalActionsProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalActions: FC<ModalActionsProps> = forwardRef<
  HTMLDivElement,
  ModalActionsProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx(className, "flex justify-end p-4")}
      {...rest}
    />
  );
});
