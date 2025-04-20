import { IFleetWithCount } from "@/shared/types/fleet.interface";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { fleetService } from "@/shared/services/fleet-service/fleet";

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

export function useFleet(filters?: IFleetFilters): IUseFleetHookReturn {
  const { data, isLoading, isSuccess } = useQuery<IFleetWithCount>({
    queryKey: [QueryKeysEnum.Fleet, filters],
    queryFn: () => fleetService.getPaginated(filters),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, isSuccess };
}
