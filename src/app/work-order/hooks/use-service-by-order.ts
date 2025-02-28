import { IServiceWithEmployee } from "@/shared/types/service.interface";
import { IApiResponse } from "@/shared/services/api";
import { ServicesService } from "@/shared/services/service";
import { useQuery } from "@tanstack/react-query";

export function useWorkOrderServices(workOrderId: string) {
  const data = useQuery<IApiResponse<IServiceWithEmployee[]>>({
    queryKey: ["work-order-services"],
    queryFn: () => ServicesService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });

  return data;
}
