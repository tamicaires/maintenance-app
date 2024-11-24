import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/services/api";
import { WorkOrderService } from "@/services/work-order";
import { useQuery } from "@tanstack/react-query";

export function useWorkOrder() {
  const data = useQuery<IApiResponse<IWorkOrder[]>>({
    queryKey: ["work-orders"],
    queryFn: WorkOrderService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  return data;
}
