import { useMergeRefs } from "@/hooks/use-merge-refs";
import type { SelectAttributes } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { type FC, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export const select = cva("select select-bordered w-full", {
  variants: {
    size: {
      xs: "select-xs",
      sm: "select-sm",
      md: "select-md",
      lg: "select-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SelectProps
  extends Omit<SelectAttributes, "size">,
    VariantProps<typeof select> {
  name: string;
}

export const Select: FC<SelectProps> = forwardRef<
  HTMLSelectElement,
  SelectProps
>((props, forwardedRef) => {
  const { size, className, name, children, placeholder, ...rest } = props;

  const { register } = useFormContext();

  const { ref, ...restRegister } = register(name);

  const inputRef = useMergeRefs(ref, forwardedRef);

  return (
    <select
      className={select({ size, className })}
      defaultValue={placeholder && "placeholder"}
      {...rest}
      ref={inputRef}
      {...restRegister}
    >
      {placeholder ? (
        <option value={"placeholder"} disabled>
          {placeholder}
        </option>
      ) : null}

      {children}
    </select>
  );
});
