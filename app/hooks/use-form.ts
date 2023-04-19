import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm as rhUseForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, z } from "zod";

export const useForm = <
  T extends ZodType<any, any, any>,
  TFieldValues extends FieldValues = z.infer<typeof schema>,
  TContext = any
>(
  props: Omit<UseFormProps<TFieldValues, TContext>, "resolver"> & { schema: T }
): UseFormReturn<TFieldValues, TContext> => {
  const { schema, ...rest } = props;

  return rhUseForm<TFieldValues, TContext>({
    resolver: zodResolver(schema),
    ...rest,
  });
};
