import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { WorkOrderService } from "@/services/work-order"
import { useEffect } from "react"
import { IStartWaitingParts } from "@/shared/types/work-order.interface"

const startWaitingPartschema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  startWaitingParts: z.date(),
})

type MutationStatusMaintenance = {
  workOrderId: string
  data: IStartWaitingParts
}
type StartWaitingPartsData = z.infer<typeof startWaitingPartschema>

export function useStartWaitingParts(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  workOrderId: string,
) {

  const defaultValues: StartWaitingPartsData = {
    status: MaintenanceStatus.AGUARDANDO_PECA,
    startWaitingParts: new Date(),
  }

  const startWaitingPartsForm = useForm<StartWaitingPartsData>({
    resolver: zodResolver(startWaitingPartschema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = startWaitingPartsForm

  const {
    mutate: mutateStartWaitingParts,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IStartWaitingParts>, Error, MutationStatusMaintenance>({
    mutationFn: ({ workOrderId, data }) => WorkOrderService.startWaitingParts(workOrderId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: `Aguardando peça iniciado com sucesso.`,
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
        message: error.message || "Ocorreu um erro ao iniciar aguardando peça.",
        duration: 5000,
      })
      setIsDialogOpen(false)
    },
  })

  const submitWaitingPartsData = (data: StartWaitingPartsData) => {
    mutateStartWaitingParts({ workOrderId, data })
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    startWaitingPartsForm,
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

