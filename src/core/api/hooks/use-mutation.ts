import { toast } from "@/hooks/use-toast"
import { useMutation as useReactMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query"
import type { AxiosError } from "axios"

export function useMutation<
  TData = unknown,
  TError = AxiosError,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn"> & {
    successMessage?: string
    errorMessage?: string
  },
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { successMessage, errorMessage, ...mutationOptions } = options || {}

  return useReactMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        toast({
          title: "Sucesso",
          description: successMessage,
          variant: "success"
        })
      } 1

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      const message = errorMessage || (error instanceof Error ? error.message : "An error occurred")

      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      })

      if (options?.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}

