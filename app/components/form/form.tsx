import type { FormAttributes } from "@/types";
import {
  type FieldValues,
  type UseFormReturn,
  FormProvider,
} from "react-hook-form";

export interface FormProps<TFieldValues extends FieldValues>
  extends Omit<FormAttributes, "onSubmit"> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => Promise<void>;
}

export const Form = <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues>
) => {
  const { form, onSubmit, ...rest } = props;

  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form {...rest} onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
};
