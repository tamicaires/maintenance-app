import { IBox } from "@/shared/types/box";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { boxService } from "@/shared/services/box-service/box";

export function useBoxes() {
  return useQuery<IBox[]>({
    queryKey: [QueryKeysEnum.Box],
    queryFn: () => boxService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}

