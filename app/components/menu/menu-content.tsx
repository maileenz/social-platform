import {
  Arrow,
  Content,
  PopoverContentProps,
  Portal,
} from "@radix-ui/react-popover";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";

export const MenuContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <Portal>
      <Content
        className={cx(
          className,
          "rounded py-2 w-[260px] bg-white shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <Arrow />
      </Content>
    </Portal>
  )
);
