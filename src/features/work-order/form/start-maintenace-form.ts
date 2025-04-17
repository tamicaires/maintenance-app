import { MaintenanceStatus } from "@/shared/enums/work-order";
import { z } from "zod";

export const startMaintenanceSchema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  entryMaintenance: z.date(),
  boxId: z.string().min(1),
})

export type StartMaintenanceSchema = z.infer<typeof startMaintenanceSchema>

export const startMaintenanceDefaultValues: StartMaintenanceSchema = {
  status: MaintenanceStatus.MANUTENCAO,
  entryMaintenance: new Date(),
  boxId: "",
}
