import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/services/api";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkOrderService } from '@/services/work-order';

export interface IWorkOrderFilters {
  page?: string;
  perPage?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export function useWorkOrder(filters: IWorkOrderFilters = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IApiResponse<IWorkOrder[]>>({
    queryKey: ['work-orders', filters],
    queryFn: () => WorkOrderService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });

  const invalidateWorkOrders = () => {
    queryClient.invalidateQueries({ queryKey: ['work-orders'] });
  };

  return { data, isLoading, error, invalidateWorkOrders };
}
