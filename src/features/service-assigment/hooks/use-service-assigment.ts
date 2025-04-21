import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { useQuery } from "@tanstack/react-query";
import { serviceAssignmentService } from "@/shared/services/service-assgiment-service/service-assigment";

export function useServiceAssigments() {
  return useQuery<IServiceAssignment[]>({
    queryKey: [QueryKeysEnum.Service_Assigment, QueryKeysEnum.Box],
    queryFn: () => serviceAssignmentService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
