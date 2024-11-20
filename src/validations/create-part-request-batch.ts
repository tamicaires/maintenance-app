import { RequestStatus } from "@/shared/enums/part-request"
import { z } from "zod"

export const partRequestItemSchema = z.object({
  partId: z.string().nonempty("Peça é um campo obrigatório"),
  requestedForEmployeeId: z.string().nullable(),
  quantity: z.number().int().positive("Quantidade deve ser um número positivo"),
  status: z.nativeEnum(RequestStatus),
  axleId: z.string().nullable(),
  trailerId: z.string().nonempty("O campo Reboque é obrigatório."),
  workOrderId: z.string().nonempty("É necessário uma ordem de serviço para a requisição"),
})

export const createPartRequestBatchSchema = z.object({
  batchData: z.array(partRequestItemSchema)
})


export type CreatePartRequestBatchData = z.infer<typeof createPartRequestBatchSchema>
export type PartRequestItem = z.infer<typeof partRequestItemSchema>