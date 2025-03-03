import { IFleet } from "@/shared/types/fleet.interface";
import { IApiResponse } from "@/shared/services/api";
import { FleetService } from "@/shared/services/fleet";
import { useQuery } from "@tanstack/react-query";

export function useFleet(page: number = 1, perPage: number = 10) {
  return useQuery<IApiResponse<IFleet[]>>({
    queryKey: ["fleets", page, perPage],
    queryFn: () => FleetService.getAll(page, perPage),
    staleTime: 60 * 5 * 1000,
  });
}
