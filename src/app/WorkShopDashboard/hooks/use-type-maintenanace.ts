import { IApiResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { DashboardService } from "@/services/dashboard";
import { queryClient } from "@/services/query-client";
import { ITypeMaintenanceChartData } from "@/shared/types/dashboard";

export function useTypeMaintenanceChart() {
  const { data, isLoading, error } = useQuery<IApiResponse<ITypeMaintenanceChartData>>({
    queryKey: [QueryKeysEnum.Dashboard, QueryKeysEnum.Work_Order],
    queryFn: DashboardService.getTypeMaintenanceChart,
    staleTime: 5 * 60 * 1000,
  });

  const invalidateTypeMaintenanceQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Dashboard] });
  }
  return { data, isLoading, error, invalidateTypeMaintenanceQuery };
}
