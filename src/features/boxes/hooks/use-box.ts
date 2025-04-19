import { IBoxWithCount } from "@/shared/types/box";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { boxService } from "@/shared/services/box-service/box";

export type IBoxFilters = {
  page?: string;
  perPage?: string;
  boxName?: string;
  isActive?: string;
  startDate?: Date;
  endDate?: Date;
}

export function useBoxes(filters?: IBoxFilters) {
  return useQuery<IBoxWithCount>({
    queryKey: [QueryKeysEnum.Box],
    queryFn: () => boxService.getPaginated(filters),
    staleTime: 60 * 5 * 1000,
  });
}

