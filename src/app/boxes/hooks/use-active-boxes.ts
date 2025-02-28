import { IApiResponse } from "@/shared/services/api";
import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { BoxService } from "@/shared/services/box";

export function useActiveBoxes() {
  const { data, isLoading, error } = useQuery<IApiResponse<IBoxWithRelationalData[]>>({
    queryKey: [QueryKeysEnum.Box],
    queryFn: BoxService.getWithRelationalData,
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

