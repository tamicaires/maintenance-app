import { IWorkOrder } from "@/shared/types/work-order.interface";
import {
  MaintenanceStatus,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";

interface FormatOptions {
  format: "hms" | "hm" | "verbose";
}

export const formatDuration = (
  milliseconds: number,
  options: FormatOptions = { format: "hms" }
): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  switch (options.format) {
    case "verbose":
      return `${hours}h ${minutes}m`;
    case "hm":
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    case "hms":
    default:
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
  }
};

export const calculateAverageTime = (
  workOrders: IWorkOrder[],
  status: MaintenanceStatus,
  type?: TypeOfMaintenance
) => {
  const filteredOrders = workOrders.filter(
    (order) =>
      order.status === status && (!type || order.typeOfMaintenance === type)
  );

  if (filteredOrders.length === 0) return "00:00:00";

  const totalMinutes = filteredOrders.reduce((acc, order) => {
    const startTime =
      status === MaintenanceStatus.FILA
        ? order.entryQueue
        : order.entryMaintenance;
    if (!startTime) return acc;
    const duration =
      (new Date().getTime() - new Date(startTime).getTime()) / (1000 * 60);
    return acc + duration;
  }, 0);

  const avgMinutes = totalMinutes / filteredOrders.length;
  const hours = Math.floor(avgMinutes / 60);
  const minutes = Math.floor(avgMinutes % 60);
  const seconds = Math.floor((avgMinutes * 60) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const calculateChange = (currentValue: number, pastValue: number) => {
  if (pastValue === 0) return currentValue > 0 ? 100 : 0;
  return ((currentValue - pastValue) / pastValue) * 100;
};
