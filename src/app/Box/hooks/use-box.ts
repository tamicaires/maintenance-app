import { IBox } from "@/interfaces/box";
import { IApiResponse } from "@/services/api";
import { BoxService } from "@/services/box";
import { useQuery } from "@tanstack/react-query";

export function useBoxes() {
  return useQuery<IApiResponse<IBox[]>>({
    queryKey: ["fleets"],
    queryFn: () => BoxService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
