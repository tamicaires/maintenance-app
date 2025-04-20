import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { boxService } from "@/shared/services/box-service/box";

export function useActiveBoxes() {
  const { data, isLoading, error } = useQuery<IBoxWithRelationalData[]>({
    queryKey: [QueryKeysEnum.Box],
    queryFn: () => boxService.getRelationalData(),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

