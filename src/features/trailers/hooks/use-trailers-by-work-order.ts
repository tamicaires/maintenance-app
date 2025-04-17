import { ITrailer } from "@/shared/types/trailer.interface";
import { IApiResponse } from "@/shared/services/api";
import { TrailerService } from "@/shared/services/trailer";
import { useQuery } from "@tanstack/react-query";

export function useTrailerByWorkOrder(workOrderId: string) {
  return useQuery<IApiResponse<ITrailer[]>>({
    queryKey: ["trailers"],
    queryFn: () => TrailerService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });
}
