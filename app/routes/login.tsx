import { button, Button } from "@/components/button";
import { Container } from "@/components/container";
import { Form, Input, Checkbox } from "@/components/form";
import { RecoveryModal } from "@/components/recovery-modal";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "@/hooks/use-form";
import { getUserId } from "@/lib/session.server";
import { loginInputValidation } from "@/lib/validation";
import { type LoaderArgs, redirect } from "@remix-run/node";
import { Link, type V2_MetaFunction } from "@remix-run/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

export const meta: V2_MetaFunction = () => [{ title: "Sign in to account" }];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (userId) return redirect("/feed");

  return null;
};

export default function Login() {
  const [open, setOpen] = useState(false);

  const { form, onSubmit } = useLoginForm();

  return (
    <Container className={"flex-grow"}>
      <h2 className="my-8 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <Form className="space-y-2" form={form} onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter email address"
          required
        />

        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox name={"rememberMe"}>Remember me</Checkbox>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen((state) => !state)}
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <Button
          colorScheme={"primary"}
          type={"submit"}
          shape={"block"}
          isLoading={form.formState.isLoading}
        >
          Sign in
        </Button>

        <div className={"flex flex-col gap-1"}>
          <div className="divider">New member?</div>

          <Link
            to={"/register"}
            className={button({
              colorScheme: "primary",
              variant: "outline",
              shape: "block",
            })}
          >
            Create account
          </Link>
        </div>
      </Form>

      <RecoveryModal isOpen={open} onClose={() => setOpen(false)} />
    </Container>
  );
}

const useLoginForm = () => {
  const { login } = useAuth();

  const form = useForm({
    schema: loginInputValidation,
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof loginInputValidation>) => {
      await login
        .mutateAsync(data)
        .catch((e) => toast(e.message, { position: "bottom-center" }));
    },
    []
  );

  return { form, onSubmit };
};
