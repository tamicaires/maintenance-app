import { IBox } from "@/shared/types/box";
import { IApiResponse } from "@/services/api";
import { BoxService } from "@/services/box";
import { useQuery } from "@tanstack/react-query";

export function useBoxes() {
  return useQuery<IApiResponse<IBox[]>>({
    queryKey: ["boxes"],
    queryFn: () => BoxService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
