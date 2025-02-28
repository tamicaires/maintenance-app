import { IVehicle } from "@/shared/types/vehicles.interface";
import { IApiResponse } from "@/shared/services/api";
import { VehicleService } from "@/shared/services/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useVehicles() {
  return useQuery<IApiResponse<IVehicle[]>>({
    queryKey: ["vehicles"],
    queryFn: () => VehicleService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
