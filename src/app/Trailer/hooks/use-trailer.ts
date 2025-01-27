import { ITrailer } from "@/shared/types/trailer.interface";
import { IApiResponse } from "@/services/api";
import { TrailerService } from "@/services/trailer";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useTrailer() {
  return useQuery<IApiResponse<ITrailer[]>>({
    queryKey: [QueryKeysEnum.Trailer, QueryKeysEnum.Service_Assigment],
    queryFn: () => TrailerService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
