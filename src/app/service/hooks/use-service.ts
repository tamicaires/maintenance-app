import { IServiceWithCount } from "@/shared/types/service.interface";
import { IApiResponse } from "@/shared/services/api";
import { ServicesService } from "@/shared/services/service";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { ServiceCategory } from "@/shared/enums/service";

export interface IServiceFilters {
  page?: string;
  perPage?: string;
  serviceName?: string;
  serviceCategory?: ServiceCategory;
}

export function useService(filters?: IServiceFilters) {
  return useQuery<IApiResponse<IServiceWithCount>>({
    queryKey: [QueryKeysEnum.Service, filters],
    queryFn: () => ServicesService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });
}
