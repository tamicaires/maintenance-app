import { IFleet } from "@/interfaces/fleet.interface";
import { IApiResponse } from "@/services/api";
import { FleetService } from "@/services/fleet";
import { useQuery } from "@tanstack/react-query";

export function useFleet() {
  const data = useQuery<IApiResponse<IFleet[]>>({
    queryKey: ["fleets"],
    queryFn: FleetService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  return data;
}
