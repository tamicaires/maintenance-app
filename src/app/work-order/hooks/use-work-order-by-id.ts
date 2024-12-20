import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { WorkOrderService } from '@/services/work-order';

export function useWorkOrderById(workOrderId: string) {

  const { data, isLoading, error } = useQuery<IApiResponse<IWorkOrder>>({
    queryKey: ['work-orders', workOrderId],
    queryFn: () => WorkOrderService.getById(workOrderId),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

