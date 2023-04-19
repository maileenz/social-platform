import { useMergeRefs } from "@/hooks/use-merge-refs";
import type { InputAttributes } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { type FC, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export const checkbox = cva("input input-bordered w-full", {
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

export interface CheckboxProps
  extends Omit<InputAttributes, "size">,
    VariantProps<typeof checkbox> {
  name: string;
}

export const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLInputElement,
  CheckboxProps
>((props, forwardedRef) => {
  const { name, size, className, children, ...rest } = props;

  const { register } = useFormContext();

  const { ref, ...restRegister } = register(name);

  const inputRef = useMergeRefs(ref, forwardedRef);

  return (
    <label className="label cursor-pointer gap-2">
      <input
        type="checkbox"
        className="checkbox checkbox-sm checkbox-primary"
        defaultChecked={false}
        {...rest}
        ref={inputRef}
        {...restRegister}
      />
      <span className="label-text">{children}</span>
    </label>
  );
});
