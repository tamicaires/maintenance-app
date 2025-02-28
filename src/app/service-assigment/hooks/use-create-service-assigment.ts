import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { z } from "zod"
import { queryClient } from "@/shared/services/query-client"
import { IApiResponse } from "@/shared/services/api"
import { ServiceAssignmentService } from "@/shared/services/service-assigment"
import { ICreateServiceAssigment, IServiceAssignment } from "@/shared/types/service-assigment"
import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment"
import { QueryKeysEnum } from "@/shared/enums/query-keys"

const createServiceAssignmentSchema = z.object({
  workOrderId: z.string().min(2, "É obrigatório está vinculado a uma Ordem Serviço"),
  serviceId: z.string().min(2, "O campo Serviço é obrigatório"),
  trailerId: z.string().min(2, "O campo Reboque é obrigatório."),
  axleId: z.string().nullable(),
  status: z.nativeEnum(ServiceAssigmentStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  startAt: z.date().nullable(),
  endAt: z.date().nullable(),
})

type CreateServiceAssignmentData = z.infer<typeof createServiceAssignmentSchema>

export function useCreateServiceAssignment(
  setIsDialogOpen: (open: boolean) => void,
  workOrderId: string,
  addToast: (toast: any) => void
) {
  const defaultValues: CreateServiceAssignmentData = {
    workOrderId: workOrderId,
    serviceId: "",
    trailerId: "",
    axleId: null,
    status: ServiceAssigmentStatus.PENDING,
    startAt: null,
    endAt: null,
  }

  const createServiceAssignmentForm = useForm<CreateServiceAssignmentData>({
    resolver: zodResolver(createServiceAssignmentSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isLoading },
  } = createServiceAssignmentForm

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IServiceAssignment>, Error, ICreateServiceAssigment>({
    mutationFn: ServiceAssignmentService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Service_Assigment] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Serviço adicionado com sucesso!",
          message: "Serviço já vinculado a ordem de serviço",
          duration: 4000,
        })
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Erro ao adicionar serviço",
        message: error.message || "Ocorreu um erro ao adicionar serviço.",
        duration: 5000,
      })
    },
  })

  const submitServiceAssignmentData = (data: CreateServiceAssignmentData) => {
    mutateCreate(data)
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    createServiceAssignmentForm,
    handleSubmit: handleSubmit(submitServiceAssignmentData),
    isSubmitting,
    isLoading,
    isError,
    isPending,
    error,
    data,
    reset,
  }
}