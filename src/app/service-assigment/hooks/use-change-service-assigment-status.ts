import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment"
import { ChangeStatusRequestType, ChangeStatusResponseType } from "@/shared/types/service-assigment"
import { ServiceAssignmentService } from "@/services/service-assigment"

const changeServiceAssignmentStatusSchema = z.object({
  serviceAssignmentId: z.string().min(1, "O ID do serviço é obrigatório"),
  status: z.nativeEnum(ServiceAssigmentStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  startAt: z.date().nullable(),
  endAt: z.date().nullable(),
})

type ChangeServiceAssignmentStatusData = z.infer<typeof changeServiceAssignmentStatusSchema>

export function useChangeServiceAssignmentStatus(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  action: 'start' | 'finish',
  serviceAssignmentId?: string,
) {

  const defaultValues: ChangeServiceAssignmentStatusData = {
    serviceAssignmentId: serviceAssignmentId || "",
    status: action === 'start' ? ServiceAssigmentStatus.IN_PROGRESS : ServiceAssigmentStatus.COMPLETED,
    startAt: null,
    endAt: null,
  }

  const changeServiceAssignmentStatusForm = useForm<ChangeServiceAssignmentStatusData>({
    resolver: zodResolver(changeServiceAssignmentStatusSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = changeServiceAssignmentStatusForm

  const {
    mutate: mutateChangeStatus,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<ChangeStatusResponseType>, Error, ChangeStatusRequestType>({
    mutationFn: ServiceAssignmentService.changeStatus,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["service-assignments"] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Status do serviço atualizado com sucesso!",
          message: `O status do serviço foi alterado para ${response.data.status}`,
          duration: 4000,
        })
        reset()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Erro ao atualizar status do serviço",
        message: error.message || "Ocorreu um erro ao atualizar o status   do serviço.",
        duration: 5000,
      })
    },
  })

  const submitChangeStatusData = (data: ChangeServiceAssignmentStatusData) => {
    mutateChangeStatus(data)
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    changeServiceAssignmentStatusForm,
    handleSubmit: handleSubmit(submitChangeStatusData),
    isSubmitting,
    submitChangeStatusData,
    control,
    isLoading,
    isPending,
    isError,
    error,
    data,
    reset,
  }
}

