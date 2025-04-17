import { ITrailer, ITrailerWithCount } from "@/shared/types/trailer.interface";
import { IApiResponse } from "@/shared/services/api";
import { TrailerService } from "@/shared/services/trailer";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

interface ITrailerHookReturn {
  data: ITrailerWithCount | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null
}

export interface ITrailerFilters {
  page?: string;
  perPage?: string;
  fleetNumber?: string;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export function useTrailer(filters?: ITrailerFilters): ITrailerHookReturn {
  const { data, isLoading, isSuccess, error } = useQuery<IApiResponse<ITrailerWithCount>>({
    queryKey: [QueryKeysEnum.Trailer, QueryKeysEnum.Service_Assigment, filters],
    queryFn: () => TrailerService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });

  return { data: data?.data, isLoading, isSuccess, error }
}
