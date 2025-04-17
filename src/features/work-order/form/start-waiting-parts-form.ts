import { MaintenanceStatus } from "@/shared/enums/work-order";
import { z } from "zod";

export const startWaitingPartschema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  startWaitingParts: z.date(),
})

export type StartWaitingPartsSchema = z.infer<typeof startWaitingPartschema>

export const startWaitingPartsdefaultValues: StartWaitingPartsSchema = {
  status: MaintenanceStatus.AGUARDANDO_PECA,
  startWaitingParts: new Date(),
}