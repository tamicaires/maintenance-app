import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment";
import { z } from "zod";

export const createServiceAssignmentSchema = z.object({
  workOrderId: z.string().min(2, "É obrigatório está vinculado a uma Ordem Serviço"),
  serviceId: z.string().min(2, "O campo Serviço é obrigatório"),
  trailerId: z.string().min(2, "O campo Reboque é obrigatório."),
  axleId: z.string().nullable(),
  status: z.nativeEnum(ServiceAssigmentStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  startAt: z.date().nullable(),
  endAt: z.date().nullable(),
})

export type CreateServiceAssignmentSchema = z.infer<typeof createServiceAssignmentSchema>

export const createServiceAssigmentDefaultValues: CreateServiceAssignmentSchema = {
  workOrderId: "",
  serviceId: "",
  trailerId: "",
  axleId: null,
  status: ServiceAssigmentStatus.PENDING,
  startAt: null,
  endAt: null,
}