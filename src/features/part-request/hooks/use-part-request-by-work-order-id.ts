import { useQuery } from "@tanstack/react-query";
import { IApiResponse } from "@/shared/services/api";
import { IPartRequest } from "@/shared/types/part-request";
import { PartRequestService } from "@/shared/services/part-request";

export function usePartRequestByWorkOrderId(workOrderId: string) {
  return useQuery<IApiResponse<IPartRequest[]>>({
    queryKey: ["part-requests", workOrderId],
    queryFn: () => PartRequestService.getByWorkOrderId(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}