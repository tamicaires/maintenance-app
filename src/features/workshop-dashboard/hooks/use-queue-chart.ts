import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { queryClient } from "@/shared/services/query-client";
import { IQueueChartData } from "@/shared/types/dashboard";
import { dashboardService } from "@/shared/services/dashboard-service/dashboard";

export function useQueueChart() {
  const { data, isLoading, error } = useQuery<IQueueChartData>({
    queryKey: [QueryKeysEnum.Dashboard, QueryKeysEnum.Work_Order],
    queryFn: () => dashboardService.getQueueChart(),
    staleTime: 5 * 60 * 1000,
  });

  const invalidateQueueChartQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Dashboard] });
  }
  return { data, isLoading, error, invalidateQueueChartQuery };
}
