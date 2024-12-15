import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/services/api";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkOrderService } from '@/services/work-order';

export function useWorkOrder() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IApiResponse<IWorkOrder[]>>({
    queryKey: ['work-orders'],
    queryFn: WorkOrderService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  const invalidateWorkOrders = () => {
    queryClient.invalidateQueries({ queryKey: ['work-orders'] });
  };

  return { data, isLoading, error, invalidateWorkOrders };
}

