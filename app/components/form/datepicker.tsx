import { useMergeRefs } from "@/hooks/use-merge-refs";
import type { InputAttributes } from "@/types";
import { type VariantProps } from "class-variance-authority";
import { type FC, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { input } from "./input";

export interface DatepickerProps
  extends Omit<InputAttributes, "size">,
    VariantProps<typeof input> {
  name: string;
}

export const Datepicker: FC<DatepickerProps> = forwardRef<
  HTMLInputElement,
  DatepickerProps
>((props, forwardedRef) => {
  const { size, className, name, ...rest } = props;

  const { register } = useFormContext();

  const { ref, ...restRegister } = register(name);

  const inputRef = useMergeRefs(ref, forwardedRef);

  return (
    <input
      className={input({ size, className })}
      {...rest}
      type={"date"}
      ref={inputRef}
      {...restRegister}
    />
  );
});
