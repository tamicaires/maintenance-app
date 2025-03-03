import { IBox } from "@/shared/types/box";
import { IApiResponse } from "@/shared/services/api";
import { BoxService } from "@/shared/services/box";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useBoxes() {
  return useQuery<IApiResponse<IBox[]>>({
    queryKey: [QueryKeysEnum.Box],
    queryFn: () => BoxService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
