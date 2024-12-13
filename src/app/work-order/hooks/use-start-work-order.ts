import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { IStartMaintenance } from "@/shared/types/work-order.interface"
import { WorkOrderService } from "@/services/work-order"
import { useEffect } from "react"

const startMaintenanceSchema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  entryMaintenance: z.date(),
  boxId: z.string().min(1),
})

type MutationStatusMaintenance = {
  workOrderId: string
  data: IStartMaintenance
}

type StatusMaintenanceData = z.infer<typeof startMaintenanceSchema>

export function useStartMaintenance(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  workOrderId: string,
) {

  const defaultValues: StatusMaintenanceData = {
    status: MaintenanceStatus.MANUTENCAO,
    entryMaintenance: new Date(),
    boxId: "",
  }

  const startMaintenanceForm = useForm<StatusMaintenanceData>({
    resolver: zodResolver(startMaintenanceSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = startMaintenanceForm

  const {
    mutate: mutateStartMaintenance,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IStartMaintenance>, Error, MutationStatusMaintenance>({
    mutationFn: ({ workOrderId, data }) => WorkOrderService.startMaintenance(workOrderId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: `Manutenção iniciada com sucesso!`,
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
        message: error.message || "Ocorreu um erro ao iniciar a manutenção.",
        duration: 5000,
      })
    },
  })

  const submitStartMaintenanceData = (data: StatusMaintenanceData) => {
    mutateStartMaintenance({ workOrderId, data })
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    startMaintenanceForm,
    handleSubmit: handleSubmit(submitStartMaintenanceData),
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

