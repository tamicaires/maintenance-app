// import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/shared/services/query-client"
import { IApiResponse } from "@/shared/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { WorkOrderService } from "@/shared/services/work-order"
import { useEffect, useMemo, useState } from "react"
import { IFinishMaintenance } from "@/shared/types/work-order.interface"
import { finishMaintenanceDefaultValues, FinishMaintenanceSchema, finishMaintenanceSchema } from "../../form/finish-maintenance-form"
import { workOrderService } from "@/shared/services/work-order-service/work-order"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { useMutation } from "@/core/api/hooks/use-mutation"

// const finishMaintenanceSchema = z.object({
//   status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
//   exitMaintenance: z.date(),
//   exitSupervisor: z.string().min(3, { message: "Supervisor de saida é obrigatório" }),
// })

// type MutationStatusMaintenance = {
//   workOrderId: string
//   data: IFinishMaintenance
// }
// type StatusMaintenanceData = z.infer<typeof finishMaintenanceSchema>

export function useFinishMaintenance(workOrderId: string) {
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(finishMaintenanceSchema),
    defaultValues: finishMaintenanceDefaultValues
  })
  const values = form.watch();
  const statusWatcher = values.status

  const { mutate: finishMaintenance, isPending } = useMutation(
    (data: FinishMaintenanceSchema) => workOrderService.finishMaintenance(workOrderId, data), {
    successMessage: "Manutenção finalizada com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      finishMaintenance(data)
    }
  )

  const handleClose = () => {
    setIsFinishDialogOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return finishMaintenanceSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    statusWatcher,
    isFinishDialogOpen,
    setIsFinishDialogOpen
  };
  // const defaultValues: StatusMaintenanceData = {
  //   status: MaintenanceStatus.FINALIZADA,
  //   exitMaintenance: new Date(),
  //   exitSupervisor: "",
  // }

  // const finishMaintenanceForm = useForm<StatusMaintenanceData>({
  //   resolver: zodResolver(finishMaintenanceSchema),
  //   defaultValues,
  // })

  // const {
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { isSubmitting, isLoading },
  // } = finishMaintenanceForm

  // const {
  //   mutate: mutateFinishMaintenance,
  //   isSuccess,
  //   isError,
  //   isPending,
  //   data,
  //   error,
  // } = useMutation<IApiResponse<IFinishMaintenance>, Error, MutationStatusMaintenance>({
  //   mutationFn: ({ workOrderId, data }) => WorkOrderService.finishMaintenance(workOrderId, data),
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: ["work-orders"] });
  //     if (response.success && response.data) {
  //       addToast({
  //         type: "success",
  //         title: "Sucesso!",
  //         message: `Manutenção finalizada com sucesso!`,
  //         duration: 4000,
  //       })
  //       reset()
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in mutation:", error)
  //     addToast({
  //       type: "error",
  //       title: "Ops, algo deu errado!",
  //       message: error.message || "Ocorreu um erro ao finalizar a manutenção.",
  //       duration: 5000,
  //     })
  //   },
  // })

  // const submitFinishMaintenanceData = (data: StatusMaintenanceData) => {
  //   mutateFinishMaintenance({ workOrderId, data })
  //   reset()
  // }

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsDialogOpen(false)
  //   }
  // }, [isSuccess, setIsDialogOpen])

  // return {
  //   finishMaintenanceForm,
  //   handleSubmit: handleSubmit(submitFinishMaintenanceData),
  //   isSubmitting,
  //   control,
  //   isLoading,
  //   isPending,
  //   isError,
  //   error,
  //   data,
  //   reset,
  // }
}

