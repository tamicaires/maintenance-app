import { IApiResponse } from "@/shared/services/api";
import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IDailyWorkOrdersData } from "@/shared/types/work-order.interface";
import { WorkOrderService } from "@/shared/services/work-order";

export function useDailyWorkOrders(startDate: string, endDate: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IDailyWorkOrdersData>>({
    queryKey: [QueryKeysEnum.Work_Order, startDate, endDate],
    queryFn: () => WorkOrderService.getDaily(startDate, endDate),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

