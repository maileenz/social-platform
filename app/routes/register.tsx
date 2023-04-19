import { button, Button } from "@/components/button";
import { Container } from "@/components/container";
import {
  Form,
  Input,
  Checkbox,
  FormControl,
  Select,
  Datepicker,
} from "@/components/form";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "@/hooks/use-form";
import { getUserId } from "@/lib/session.server";
import { registerInputValidation } from "@/lib/validation";
import { type LoaderArgs, redirect } from "@remix-run/node";
import { Link, type V2_MetaFunction } from "@remix-run/react";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

export const meta: V2_MetaFunction = () => [{ title: "Create new account" }];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (userId) return redirect("/feed");

  return null;
};

export default function Register() {
  const { form, onSubmit } = useRegisterForm();

  return (
    <Container size={"2xl"} className={"flex-grow"}>
      <h2 className="mt-8 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Create new account
      </h2>
      <Form className="space-y-2" form={form} onSubmit={onSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <FormControl label={"Name"} name="name">
            <Input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter name"
              required
            />
          </FormControl>

          <FormControl label={"Surname"} name="surname">
            <Input
              name="surname"
              type="text"
              autoComplete="surname"
              placeholder="Enter surname"
            />
          </FormControl>
        </div>

        <FormControl label={"Email"} name="email">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            required
          />
        </FormControl>

        <FormControl label={"Password"} name="password">
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            required
          />
        </FormControl>

        <FormControl label={"Gender"} name={"gender"}>
          <Select name={"gender"} placeholder={"Select your gender"} required>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </Select>
        </FormControl>

        <FormControl label={"Date of birth"} name="dateOfBirth">
          <Datepicker
            name="dateOfBirth"
            autoComplete="date-of-birth"
            required
          />
        </FormControl>

        <div className="flex items-center justify-between">
          <Checkbox name={"acceptTerms"}>Accept terms and conditions</Checkbox>
        </div>

        <div className={"flex flex-col gap-1"}>
          <Button
            colorScheme={"primary"}
            type={"submit"}
            shape={"block"}
            isLoading={form.formState.isLoading}
          >
            Create account
          </Button>

          <div className="divider">Already a member?</div>

          <Link
            to={"/login"}
            className={button({
              colorScheme: "primary",
              variant: "outline",
              shape: "block",
            })}
          >
            Sign in
          </Link>
        </div>
      </Form>
    </Container>
  );
}

const useRegisterForm = () => {
  const { register } = useAuth();

  const form = useForm({
    schema: registerInputValidation,
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof registerInputValidation>) => {
      await register
        .mutateAsync(data)
        .catch((e) => toast(e.message, { position: "bottom-center" }));
    },
    []
  );

  return { form, onSubmit };
};
