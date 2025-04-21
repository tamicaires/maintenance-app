import { IWorkOrder } from "@/shared/types/work-order.interface";
import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { workOrderService } from "@/shared/services/work-order-service/work-order";

export function useWorkOrderById(workOrderId: string, options = {}) {
  const { data, isLoading, error } = useQuery<IWorkOrder>({
    queryKey: [QueryKeysEnum.Work_Order, workOrderId],
    queryFn: () => workOrderService.getById(workOrderId),
    staleTime: 60 * 5 * 1000,
    ...options
  });

  return { data, isLoading, error };
}

