import { useMergeRefs } from "@/hooks/use-merge-refs";
import type { InputAttributes } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export const input = cva("input input-bordered w-full", {
  variants: {
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface InputProps
  extends Omit<InputAttributes, "size">,
    VariantProps<typeof input> {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const { size, className, name, type = "text", ...rest } = props;

    const { register } = useFormContext();

    const { ref, ...restRegister } = register(name);

    const inputRef = useMergeRefs(ref, forwardedRef);

    return (
      <input
        className={input({ size, className })}
        type={type}
        {...rest}
        ref={inputRef}
        {...restRegister}
      />
    );
  }
);
