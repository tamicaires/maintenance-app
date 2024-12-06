import {
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { z } from "zod";

export const createWorkOrderSchema = z
  .object({
    severityLevel: z.nativeEnum(SeverityLevel, {
      errorMap: () => ({ message: "Grau de severidade é obrigatório" }),
    }),
    entryQueue: z.date().optional(),
    entryMaintenance: z.date().optional(),
    exitMaintenance: z.date().optional(),
    status: z.nativeEnum(MaintenanceStatus, {
      errorMap: () => ({ message: "Status é obrigatório" }),
    }),
    fleetId: z.string().min(1, { message: "Frota é obrigatória" }),
    typeOfMaintenance: z.nativeEnum(TypeOfMaintenance, {
      errorMap: () => ({ message: "Tipo de manutenção é obrigatório" }),
    }),
    boxId: z.string().optional(),
    isCancelled: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.status === MaintenanceStatus.FILA && !data.entryQueue)
        return false;
      if (
        data.status === MaintenanceStatus.MANUTENCAO &&
        !data.entryMaintenance
      )
        return false;
      if (data.status === MaintenanceStatus.AGUARDANDO_PECA && !data.entryQueue)
        return false;
      return true;
    },
    {
      message:
        "Pelo menos um campo de entrada é obrigatório de acordo com o status",
      path: ["entryQueue", "entryMaintenance"],
    }
  )
  .refine(
    (data) => {
      if (data.status === MaintenanceStatus.FILA && !data.entryQueue) {
        return false;
      }
      if (
        data.status === MaintenanceStatus.MANUTENCAO &&
        !data.entryMaintenance
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Campo 'Entrada Fila' é obrigatório.",
      path: ["entryQueue"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status === MaintenanceStatus.MANUTENCAO &&
        !data.entryMaintenance
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Campo 'Entrada Manutenção' é obrigatório.",
      path: ["entryMaintenance"],
    }
  )
  .refine(
    (data) => {
      if (
        data.status === MaintenanceStatus.MANUTENCAO &&
        !data.boxId
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Campo 'Box' é obrigatório.",
      path: ["boxId"],
    }
  );
