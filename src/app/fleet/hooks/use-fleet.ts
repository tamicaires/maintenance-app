import { IFleetWithCount } from "@/shared/types/fleet.interface";
import { IApiResponse } from "@/shared/services/api";
import { FleetService } from "@/shared/services/fleet";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export interface IUseFleetHookReturn {
  data: IFleetWithCount | undefined;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface IFleetFilters {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export function useFleet(filters: IFleetFilters = {}): IUseFleetHookReturn {
  const { data, isLoading, isSuccess } = useQuery<IApiResponse<IFleetWithCount>>({
    queryKey: [QueryKeysEnum.Fleet, filters],
    queryFn: () => FleetService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });

  return {
    data: data?.data,
    isLoading,
    isSuccess
  };
}
