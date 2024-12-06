import { IApiResponse } from "@/services/api";
import { ServiceAssignmentService } from "@/services/service-assigment";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { useQuery } from "@tanstack/react-query";

export function useServiceAssigments(workOrderId: string) {
  return useQuery<IApiResponse<IServiceAssignment[]>>({
    queryKey: ["service-assignments", workOrderId],
    queryFn: () => ServiceAssignmentService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}
