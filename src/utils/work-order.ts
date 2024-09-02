import { IWorkOrder } from "@/interfaces/work-order.interface";

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
