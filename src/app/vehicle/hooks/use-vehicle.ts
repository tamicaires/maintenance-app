import { IVehicleWithCount } from "@/app/vehicle/type/vehicles";
import { IApiResponse } from "@/shared/services/api";
import { VehicleService } from "@/shared/services/vehicle";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IUseVehiclesHookReturn, IVehicleFilters } from "../type/vehicle-hook";

export function useVehicles(filters?: IVehicleFilters): IUseVehiclesHookReturn {
  const { data, isLoading, error } = useQuery<IApiResponse<IVehicleWithCount>>({
    queryKey: [QueryKeysEnum.Vehicle],
    queryFn: () => VehicleService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });

  return { data: data?.data, isLoading, error };
}
