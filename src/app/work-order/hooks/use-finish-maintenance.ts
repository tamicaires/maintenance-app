import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { WorkOrderService } from "@/services/work-order"
import { useEffect } from "react"
import { IFinishMaintenance } from "@/shared/types/work-order.interface"

const finishMaintenanceSchema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  exitMaintenance: z.date(),
  exitSupervisor: z.string().min(3, { message: "Supervisor de saida é obrigatório" }),
})

type MutationStatusMaintenance = {
  workOrderId: string
  data: IFinishMaintenance
}
type StatusMaintenanceData = z.infer<typeof finishMaintenanceSchema>

export function useFinishMaintenance(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  workOrderId: string,
) {

  const defaultValues: StatusMaintenanceData = {
    status: MaintenanceStatus.MANUTENCAO,
    exitMaintenance: new Date(),
    exitSupervisor: "",
  }

  const finishMaintenanceForm = useForm<StatusMaintenanceData>({
    resolver: zodResolver(finishMaintenanceSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = finishMaintenanceForm

  const {
    mutate: mutateFinishMaintenance,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IFinishMaintenance>, Error, MutationStatusMaintenance>({
    mutationFn: ({ workOrderId, data }) => WorkOrderService.finishMaintenance(workOrderId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: `Manutenção finalizada com sucesso!`,
          duration: 4000,
        })
        reset()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao finalizar a manutenção.",
        duration: 5000,
      })
    },
  })

  const submitFinishMaintenanceData = (data: StatusMaintenanceData) => {
    mutateFinishMaintenance({ workOrderId, data })
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    finishMaintenanceForm,
    handleSubmit: handleSubmit(submitFinishMaintenanceData),
    isSubmitting,
    control,
    isLoading,
    isPending,
    isError,
    error,
    data,
    reset,
  }
}

