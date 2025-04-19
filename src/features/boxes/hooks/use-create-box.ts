import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { queryClient } from "@/shared/services/query-client";
import { CreateBoxData, createBoxSchema } from "@/validations/create-box";
import { createBoxDefaultValues, CreateBoxSchema } from "../forms/create-box-form";
import { useMutation } from "@/core/api/hooks/use-mutation";
import { boxService } from "@/shared/services/box-service/box";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { useDialog } from "@/context/dialog";

export function useCreateBox() {
  const { closeDialog } = useDialog();
  const form = useForm({
    resolver: zodResolver(createBoxSchema),
    defaultValues: createBoxDefaultValues
  })
  const values = form.watch();

  const { mutate: createOrder, isPending } = useMutation(
    (data: CreateBoxSchema) => boxService.create(data), {
    successMessage: "Box cadastrado com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Box] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createOrder(data)
    }
  )

  const handleClose = () => {
    closeDialog()
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return createBoxSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
  };
}

export type FormFields = keyof CreateBoxData;