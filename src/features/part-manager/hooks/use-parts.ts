import { IPart } from "@/shared/types/part";
import { useQuery } from "@tanstack/react-query";
import { partService } from "@/shared/services/part-service/part";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useParts() {
  return useQuery<IPart[]>({
    queryKey: [QueryKeysEnum.Part],
    queryFn: () => partService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
