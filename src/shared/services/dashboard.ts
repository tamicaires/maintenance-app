import { handleRequest, IApiResponse } from "@/shared/services/api";
import { ApiEndpoints } from "@/shared/constants/api-urls";
import { IQueueChartData, ITypeMaintenanceChartData } from "@/shared/types/dashboard";

const getQueueChart = async (
): Promise<IApiResponse<IQueueChartData>> => {

  const response = await handleRequest<IQueueChartData>({
    method: "GET",
    url: `${ApiEndpoints.DASHBOARD.GET_QUEUE_CHART}`,
  });

  return response;
};

const getTypeMaintenanceChart = async (
): Promise<IApiResponse<ITypeMaintenanceChartData>> => {

  const response = await handleRequest<ITypeMaintenanceChartData>({
    method: "GET",
    url: `${ApiEndpoints.DASHBOARD.GET_TYPE_MAINTENANCE_CHART}`,
  });

  return response;
};

export const DashboardService = {
  getQueueChart,
  getTypeMaintenanceChart,
};
