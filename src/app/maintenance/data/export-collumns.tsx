import { ExcelColumn } from "@/shared/types/excel-export";

export const reportMaintenanceColumns: ExcelColumn[] = [
  { key: "displayId", label: "ID" },
  { key: "fleet.fleetNumber", label: "Número da Frota" },
  { key: "fleet.carrierName", label: "Transportadora" },
  { key: "severityLevel", label: "Nível de Severidade" },
  { key: "entryQueue", label: "Entrada na Fila" },
  { key: "entryMaintenance", label: "Início da Manutenção" },
  { key: "exitMaintenance", label: "Saída da Manutenção" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Criado Em" },
];
