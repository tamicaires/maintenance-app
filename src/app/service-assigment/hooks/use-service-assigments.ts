import { IApiResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { ServiceAssignmentService } from "@/services/service-assigment";

export function useServiceAssigments(workOrderId: string) {
  return useQuery<IApiResponse<IServiceAssignment[]>>({
    queryKey: ["service-assignments"],
    queryFn: () => ServiceAssignmentService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}
