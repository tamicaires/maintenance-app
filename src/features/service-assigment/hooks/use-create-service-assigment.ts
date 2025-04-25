import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { queryClient } from "@/shared/services/query-client"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { createServiceAssigmentDefaultValues, CreateServiceAssignmentSchema, createServiceAssignmentSchema } from "../forms/create-service-assigment-form"
import { useMutation } from "@/core/api/hooks/use-mutation"
import { serviceAssignmentService } from "@/shared/services/service-assgiment-service/service-assigment"
import { useDialog } from "@/core/providers/dialog"

export function useCreateServiceAssignment(workOrderId: string) {
  const { closeDialog } = useDialog()

  const form = useForm({
    resolver: zodResolver(createServiceAssignmentSchema),
    defaultValues: {
      ...createServiceAssigmentDefaultValues,
      workOrderId: workOrderId,
    }
  })
  const values = form.watch();
  const statusWatcher = form.watch("status");
  const trailerIdWatcher = form.watch("trailerId");

  const { mutate: createServiceAssigment, isPending } = useMutation(
    (data: CreateServiceAssignmentSchema) => serviceAssignmentService.create(data), {
    successMessage: "Designação de serviço realizada com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Service_Assigment] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createServiceAssigment(data)
    }
  )

  const handleClose = () => {
    closeDialog()
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return createServiceAssignmentSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    statusWatcher,
    trailerIdWatcher,
  };
}