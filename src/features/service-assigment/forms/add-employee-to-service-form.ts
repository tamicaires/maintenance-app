import { z } from "zod";

export const addEmployeeToServiceAssignmentSchema = z.object({
  serviceAssigmentId: z.string().min(1, "O ID do serviço é obrigatório"),
  employeeId: z.string().min(1, "O ID do funcionário é obrigatório"),
})

export type AddEmployeeToServiceAssignmentSchema = z.infer<typeof addEmployeeToServiceAssignmentSchema>

export const addEmployeeToServicedefaultValues: AddEmployeeToServiceAssignmentSchema = {
  serviceAssigmentId: "",
  employeeId: "",
}