import { IApiResponse } from "@/services/api";
import { ServiceAssignmentService } from "@/services/service-assigment";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { useQuery } from "@tanstack/react-query";

export function useServiceAssigments(workOrderId: string) {
  return useQuery<IApiResponse<IServiceAssignment[]>>({
    queryKey: [QueryKeysEnum.Service_Assigment, QueryKeysEnum.Box, workOrderId],
    queryFn: () => ServiceAssignmentService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}
