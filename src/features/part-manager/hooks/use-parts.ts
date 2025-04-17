import { IPart } from "@/shared/types/part";
import { IApiResponse } from "@/shared/services/api";
import { PartService } from "@/shared/services/part";
import { useQuery } from "@tanstack/react-query";

export function useParts() {
  return useQuery<IApiResponse<IPart[]>>({
    queryKey: ["parts"],
    queryFn: () => PartService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
