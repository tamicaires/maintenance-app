import { IPart } from "@/interfaces/part";
import { IApiResponse } from "@/services/api";
import { PartService } from "@/services/part";
import { useQuery } from "@tanstack/react-query";

export function useParts() {
  return useQuery<IApiResponse<IPart[]>>({
    queryKey: ["parts"],
    queryFn: () => PartService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
