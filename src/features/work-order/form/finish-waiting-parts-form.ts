import { MaintenanceStatus } from "@/shared/enums/work-order"
import { z } from "zod"

export const finishWaitingPartschema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  endWaitingParts: z.date(),
})

export type FinishWaitingPartsSchema = z.infer<typeof finishWaitingPartschema>

export const finishWaitingPartsdefaultValues: FinishWaitingPartsSchema = {
  status: MaintenanceStatus.MANUTENCAO,
  endWaitingParts: new Date(),
}