import * as z from "zod";
import { RequestStatus } from "@/shared/enums/part-request"

export const createPartRequestSchema = z.object({
  partId: z.string().uuid({ message: "ID da peça inválido" }),
  requestedForEmployeeId: z.string().uuid({ message: "ID do funcionário inválido" }).nullable(),
  handledById: z.string().uuid({ message: "ID do responsável inválido" }).nullable(),
  quantity: z.number().int().positive({ message: "A quantidade deve ser um número positivo" }),
  approvedQuantity: z.number().int().nonnegative({ message: "A quantidade aprovada deve ser um número não negativo" }).nullable(),
  status: z.nativeEnum(RequestStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  isRejected: z.boolean(),
  axleId: z.string().uuid({ message: "ID do eixo inválido" }).nullable(),
  trailerId: z.string().uuid({ message: "ID do reboque inválido" }).nullable(),
  workOrderId: z.string().uuid({ message: "ID da ordem de serviço inválido" }).nullable(),
});

export type CreatePartRequestData = z.infer<typeof createPartRequestSchema>;