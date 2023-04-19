import { UserGender } from "@prisma/client";
import { z } from "zod";

export const loginInputValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export const registerInputValidation = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      "Date of birth is required."
    ),
  gender: z.nativeEnum(UserGender, {
    description: "Field is required",
    required_error: "Field is required",
    invalid_type_error: "Field is required",
  }),
  acceptTerms: z.literal(true),
});
