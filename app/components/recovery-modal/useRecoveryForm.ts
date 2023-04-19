import { useForm } from "@/hooks/use-form";
import { trpc } from "@/lib/trpc";
import { useCallback } from "react";
import { z } from "zod";
import { useModalContext } from "../modal";

export const useRecoveryForm = () => {
  const schema = z.object({ email: z.string().email() });

  const form = useForm({ schema });

  const { onClose } = useModalContext();

  const recovery = trpc.recovery.sendEmail.useMutation({
    onSuccess() {
      onClose();
    },
  });

  const onSubmit = useCallback(async ({ email }: z.infer<typeof schema>) => {
    await recovery.mutateAsync(email);
  }, []);

  return { form, onSubmit };
};
