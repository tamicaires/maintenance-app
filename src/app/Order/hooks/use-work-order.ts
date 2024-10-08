import { IWorkOrder } from "@/interfaces/work-order.interface";
import { IApiResponse } from "@/services/api";
import { WorkOrderService } from "@/services/work-order";
import { useQuery } from "@tanstack/react-query";

export function useWorkOrder() {
  const data = useQuery<IApiResponse<IWorkOrder[]>>({
    queryKey: ["work-orders"],
    queryFn: WorkOrderService.getAll,
    staleTime: 60 * 5 * 1000,
  });
  console.log("react work", data);
  return data;
}
