import { ICarrier } from "@/interfaces/carrier";
import { IApiResponse } from "@/services/api";
import { CarrierService } from "@/services/carrier";
import { useQuery } from "@tanstack/react-query";

export function useCarrier() {
  const data = useQuery<IApiResponse<ICarrier[]>>({
    queryKey: ["carriers"],
    queryFn: CarrierService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  return data;
}
