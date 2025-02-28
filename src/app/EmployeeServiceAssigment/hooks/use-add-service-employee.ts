import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { z } from "zod"
import { queryClient } from "@/shared/services/query-client"
import { IApiResponse } from "@/shared/services/api"
import { EmployeeServiceAssigmentService } from "@/shared/services/employee-service-assigment"
import { EmployeeServiceAssigmentType } from "@/shared/types/employee-service-assigment"

const addEmployeeToServiceAssignmentSchema = z.object({
  serviceAssigmentId: z.string().min(1, "O ID do serviço é obrigatório"),
  employeeId: z.string().min(1, "O ID do funcionário é obrigatório"),
})

type AddEmployeeToServiceAssignmentData = z.infer<typeof addEmployeeToServiceAssignmentSchema>

export function useAddEmployeeToServiceAssignment(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void
) {
  const defaultValues: AddEmployeeToServiceAssignmentData = {
    serviceAssigmentId: "",
    employeeId: "",
  }

  const addEmployeeToServiceAssignmentForm = useForm<AddEmployeeToServiceAssignmentData>({
    resolver: zodResolver(addEmployeeToServiceAssignmentSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isLoading },
  } = addEmployeeToServiceAssignmentForm

  const {
    mutate: mutateAddEmployee,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation<IApiResponse<EmployeeServiceAssigmentType>, Error, AddEmployeeToServiceAssignmentData>({
    mutationFn: EmployeeServiceAssigmentService.addServiceEmployee,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["service-assignments"] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Profissional técnico adicionado com sucesso!",
          message: "Funcionário já foi vinculado ao serviço",
          duration: 4000,
        })
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Erro ao designar serviço",
        message: error.message || "Ocorreu um erro ao adicionar funcionário ao serviço.",
        duration: 5000,
      })
    },
  })

  const submitAddEmployeeData = (data: AddEmployeeToServiceAssignmentData) => {
    mutateAddEmployee(data)
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    addEmployeeToServiceAssignmentForm,
    handleSubmit: handleSubmit(submitAddEmployeeData),
    isSubmitting,
    submitAddEmployeeData,
    isLoading,
    isError,
    error,
    data,
    reset,
  }
}

