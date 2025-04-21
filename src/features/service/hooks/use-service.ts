import { IServiceWithCount } from "@/shared/types/service.interface";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { ServiceCategory } from "@/shared/enums/service";
import { servicesService } from "@/shared/services/service-service/service";

export type IServiceFilters = {
  page?: string;
  perPage?: string;
  serviceName?: string;
  serviceCategory?: ServiceCategory;
}

export function useService(filters?: IServiceFilters) {
  return useQuery<IServiceWithCount>({
    queryKey: [QueryKeysEnum.Service, filters],
    queryFn: () => servicesService.getPaginated(filters),
    staleTime: 60 * 5 * 1000,
  });
}
