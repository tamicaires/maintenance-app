import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { queryClient } from "@/shared/services/query-client"
import { addEmployeeToServiceAssignmentSchema, addEmployeeToServicedefaultValues, AddEmployeeToServiceAssignmentSchema } from "../forms/add-employee-to-service-form"
import { useMutation } from "@/core/api/hooks/use-mutation"
import { employeeServiceAssigmentService } from "@/shared/services/employee-service-assigment/employee-service-assigment"
import { QueryKeysEnum } from "@/shared/enums/query-keys"

export function useAddEmployeeToServiceAssignment() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(addEmployeeToServiceAssignmentSchema),
    defaultValues: addEmployeeToServicedefaultValues
  })
  const values = form.watch();

  const { mutate: addEmployeeToService, isPending } = useMutation(
    (data: AddEmployeeToServiceAssignmentSchema) => employeeServiceAssigmentService.addServiceEmployee(data), {
    successMessage: "Profissional técnico adicionado com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Service_Assigment] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      addEmployeeToService(data)
    }
  )

  const submitAddEmployeeData = (data: AddEmployeeToServiceAssignmentSchema) => {
    addEmployeeToService(data)
  }

  const handleClose = () => {
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return addEmployeeToServiceAssignmentSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    submitAddEmployeeData
  };
}

