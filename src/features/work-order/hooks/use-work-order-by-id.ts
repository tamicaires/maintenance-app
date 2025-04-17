import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/shared/services/api";
import { useQuery } from '@tanstack/react-query';
import { WorkOrderService } from '@/shared/services/work-order';

export function useWorkOrderById(workOrderId: string, options = {}) {

  const { data, isLoading, error } = useQuery<IApiResponse<IWorkOrder>>({
    queryKey: ['work-orders', workOrderId],
    queryFn: () => WorkOrderService.getById(workOrderId),
    staleTime: 60 * 5 * 1000,
    ...options
  });

  return { data, isLoading, error };
}

