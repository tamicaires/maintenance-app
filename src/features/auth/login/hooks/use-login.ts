import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginDefaultValues, LoginFormSchema, loginFormSchema } from "../form/login-form-fields";
import { useMutation } from "@/core/api/hooks/use-mutation";
import authService from "@/core/auth/auth-service";
import { queryClient } from "@/core/api/hooks/use-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/shared/enums/routes";

export default function useLogin() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefaultValues
  })
  const values = form.watch();

  const { mutate: login, isPending } = useMutation((data: LoginFormSchema) => authService.login(data.email, data.password), {
    successMessage: "Login efetuado com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Auth] })
      navigate(PrivateRoutes.Home)
    }
  });

  const handleSubmit = form.handleSubmit(
    ({ email, password }) => {
      login({ email, password })
    }
  )

  const canSubmit = useMemo(() => {
    return loginFormSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit
  }
}