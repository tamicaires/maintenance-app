import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { createWorkOrderSchema } from "@/validations/create-work-order";
import { queryClient } from "@/shared/services/query-client";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { createOrderDefaultValues, CreateWorkOrderSchema } from "../form/create-order-form";
import { workOrderService } from "@/shared/services/work-order-service/work-order";
import { useMutation } from "@/core/api/hooks/use-mutation";

export function useCreateWorkOrder() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(createWorkOrderSchema),
    defaultValues: createOrderDefaultValues
  })
  const values = form.watch();
  const statusWatcher = values.status

  const { mutate: createOrder, isPending } = useMutation(
    (data: CreateWorkOrderSchema) => workOrderService.create(data), {
    successMessage: "Ordem de serviço aberta com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createOrder(data)
    }
  )

  const handleClose = () => {
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return createWorkOrderSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    statusWatcher,
    isCreateDialogOpen,
    setIsCreateDialogOpen
  };
}
