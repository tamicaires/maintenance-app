import { MaintenanceStatus } from "@/shared/enums/work-order";
import { z } from "zod";

export const finishMaintenanceSchema = z.object({
  status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
  exitMaintenance: z.date(),
  exitSupervisor: z.string().min(3, { message: "Supervisor de saida é obrigatório" }),
})

export type FinishMaintenanceSchema = z.infer<typeof finishMaintenanceSchema>

export const finishMaintenanceDefaultValues: FinishMaintenanceSchema = {
  status: MaintenanceStatus.FINALIZADA,
  exitMaintenance: new Date(),
  exitSupervisor: "",
}