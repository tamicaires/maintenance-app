import { ITrailer } from "@/interfaces/trailer.interface";
import { IApiResponse } from "@/services/api";
import { TrailerService } from "@/services/trailer";
import { useQuery } from "@tanstack/react-query";

export function useTrailer() {
  return useQuery<IApiResponse<ITrailer[]>>({
    queryKey: ["trailers"],
    queryFn: () => TrailerService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
