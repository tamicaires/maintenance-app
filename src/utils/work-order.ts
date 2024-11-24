import { IWorkOrder } from "@/shared/types/work-order.interface";
import { MaintenanceStatus, TMaintenanceStatus } from "@/shared/enums/work-order";
import { AlertOctagon, CheckCircle, Clock, Package, Wrench } from "lucide-react";

export function calculateDuration(
  startTime?: string,
  endTime?: string
): number | null {
  if (!startTime) return null;
  const start = new Date(startTime).getTime();
  const end = endTime ? new Date(endTime).getTime() : Date.now();
  return Math.max(0, end - start);
}

export function calculateMaintenanceDuration(
  workOrder: IWorkOrder
): number | null {
  return calculateDuration(
    workOrder.entryMaintenance,
    workOrder.exitMaintenance
  );
}

export function calculateQueueDuration(workOrder: IWorkOrder): number | null {
  return calculateDuration(workOrder.entryQueue, workOrder.entryMaintenance);
}

export function calculateWaitingPartsDuration(
  workOrder: IWorkOrder
): number | null {
  return calculateDuration(
    workOrder.startWaitingParts,
    workOrder.endWaitingParts
  );
}

export const getStatusInfo = (status: MaintenanceStatus) => {
  switch (status) {
    case MaintenanceStatus.FILA:
      return {
        color: "yellow",
        icon: Clock,
        label: "Em Fila",
        description: "Aguardando início da manutenção",
      };
    case MaintenanceStatus.MANUTENCAO:
      return {
        color: "blue",
        icon: Wrench,
        label: "Em Manutenção",
        description: "Manutenção em andamento",
      };
    case MaintenanceStatus.AGUARDANDO_PECA:
      return {
        color: "orange",
        icon: Package,
        label: "Aguardando Peça",
        description: "Esperando entrega de peças",
      };
    case MaintenanceStatus.FINALIZADA:
      return {
        color: "green",
        icon: CheckCircle,
        label: "Finalizada",
        description: "Manutenção concluída",
      };
    default:
      return {
        color: "gray",
        icon: AlertOctagon,
        label: "Status Desconhecido",
        description: "Status não identificado",
      };
  }
};

export const calculateProgress = (workOrderStatus: MaintenanceStatus) => {
  switch (workOrderStatus) {
    case MaintenanceStatus.FILA:
      return 25;
    case MaintenanceStatus.MANUTENCAO:
      return 50;
    case MaintenanceStatus.AGUARDANDO_PECA:
      return 75;
    case MaintenanceStatus.FINALIZADA:
      return 100;
    default:
      return 0;
  }
};