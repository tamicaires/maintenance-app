import { z } from "zod";

export enum LoginFields {
  Email = "email",
  Password = "password",
}

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(5, {
      message: "Senha deve conter pelo menos 5 caracteres",
    })
    .max(255, {
      message: "Senha deve conter no máximo 255 caracteres",
    }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const loginDefaultValues: LoginFormSchema = {
  email: "",
  password: "",
};
