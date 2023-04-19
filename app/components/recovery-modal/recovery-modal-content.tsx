import { type FC } from "react";
import { Button } from "../button";
import { Form, Input } from "../form";
import { ModalActions, ModalContent, ModalTitle } from "../modal";
import { useRecoveryForm } from "./useRecoveryForm";

export const RecoveryModalContent: FC = () => {
  const { form, onSubmit } = useRecoveryForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <ModalTitle>Forgot your password?</ModalTitle>
      <ModalContent className="grid gap-3">
        <p>
          Please enter your email address in order to recover your password.
        </p>
        <Input
          placeholder={"Enter email address"}
          {...form.register("email")}
        />
      </ModalContent>
      <ModalActions>
        <Button type={"submit"} isLoading={form.formState.isLoading}>
          Submit
        </Button>
      </ModalActions>
    </Form>
  );
};
