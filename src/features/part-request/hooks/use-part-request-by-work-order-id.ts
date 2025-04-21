import { useQuery } from "@tanstack/react-query";
import { IPartRequest } from "@/shared/types/part-request";
import { partRequestService } from "@/shared/services/part-request-service/part-request";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function usePartRequestByWorkOrderId(workOrderId: string) {
  return useQuery<IPartRequest[]>({
    queryKey: [QueryKeysEnum.Part_Request, workOrderId],
    queryFn: () => partRequestService.getByWorkOrderId(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}