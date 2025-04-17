import { IWorkOrderWithCount } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/shared/services/api";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkOrderService } from '@/shared/services/work-order';
import { MaintenanceStatus, SeverityLevel, TypeOfMaintenance } from "@/shared/enums/work-order";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

interface IWorkOrderHookReturn {
  data: IWorkOrderWithCount | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  invalidateWorkOrders: () => void;
}
export interface IWorkOrderFilters {
  page?: string;
  perPage?: string;
  fleetNumber?: string;
  displayId?: string;
  typeOfMaintenance?: TypeOfMaintenance | TypeOfMaintenance[];
  severityLevel?: SeverityLevel | SeverityLevel[];
  status?: MaintenanceStatus | MaintenanceStatus[];
  startDate?: Date;
  endDate?: Date;
}

export function useWorkOrder(filters: IWorkOrderFilters = {}): IWorkOrderHookReturn {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery<IApiResponse<IWorkOrderWithCount>>({
    queryKey: [QueryKeysEnum.Work_Order, filters],
    queryFn: () => WorkOrderService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });

  const invalidateWorkOrders = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] });
  };

  return { data: data?.data, isLoading, isSuccess, invalidateWorkOrders };
}
