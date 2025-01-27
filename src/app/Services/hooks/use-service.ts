import { IService } from "@/shared/types/service.interface";
import { IApiResponse } from "@/services/api";
import { ServicesService } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useService() {
  return useQuery<IApiResponse<IService[]>>({
    queryKey: [QueryKeysEnum.Service],
    queryFn: () => ServicesService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
