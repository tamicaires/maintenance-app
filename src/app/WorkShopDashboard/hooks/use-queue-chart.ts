import { IApiResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { DashboardService } from "@/services/dashboard";
import { queryClient } from "@/services/query-client";
import { IQueueChartData } from "@/shared/types/dashboard";

export function useQueueChart() {
  const { data, isLoading, error } = useQuery<IApiResponse<IQueueChartData>>({
    queryKey: [QueryKeysEnum.Dashboard, QueryKeysEnum.Work_Order],
    queryFn: DashboardService.getQueueChart,
    staleTime: 5 * 60 * 1000,
  });

  const invalidateQueueChartQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Dashboard] });
  }
  return { data, isLoading, error, invalidateQueueChartQuery };
}
