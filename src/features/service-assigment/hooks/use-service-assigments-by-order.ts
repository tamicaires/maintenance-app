import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { useQuery } from "@tanstack/react-query";
import { serviceAssignmentService } from "@/shared/services/service-assgiment-service/service-assigment";

export function useServiceAssigmentsByWorkOrder(workOrderId: string) {
  return useQuery<IServiceAssignment[]>({
    queryKey: [QueryKeysEnum.Service_Assigment, QueryKeysEnum.Box, workOrderId],
    queryFn: () => serviceAssignmentService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}
