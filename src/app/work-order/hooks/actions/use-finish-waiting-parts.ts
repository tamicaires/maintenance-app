import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { WorkOrderService } from "@/services/work-order"
import { useEffect } from "react"
import { IFinishWaitingParts } from "@/shared/types/work-order.interface"

const finishWaitingPartschema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  endWaitingParts: z.date(),
})

type MutationStatusMaintenance = {
  workOrderId: string
  data: IFinishWaitingParts
}
type FinishWaitingPartsData = z.infer<typeof finishWaitingPartschema>

export function useFinishWaitingParts(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  workOrderId: string,
) {

  const defaultValues: FinishWaitingPartsData = {
    status: MaintenanceStatus.MANUTENCAO,
    endWaitingParts: new Date(),
  }

  const finishWaitingPartsForm = useForm<FinishWaitingPartsData>({
    resolver: zodResolver(finishWaitingPartschema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = finishWaitingPartsForm

  const {
    mutate: mutateFinishWaitingParts,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IFinishWaitingParts>, Error, MutationStatusMaintenance>({
    mutationFn: ({ workOrderId, data }) => WorkOrderService.finishWaitingParts(workOrderId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: `Periodo de aguardando peça finalizado com sucesso.`,
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
        message: error.message || "Ocorreu um erro ao finalizar aguardando peça.",
        duration: 5000,
      })
      setIsDialogOpen(false)
    },
  })

  const submitWaitingPartsData = (data: FinishWaitingPartsData) => {
    mutateFinishWaitingParts({ workOrderId, data })
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    finishWaitingPartsForm,
    handleSubmit: handleSubmit(submitWaitingPartsData),
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

