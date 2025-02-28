import { ICarrier } from "@/shared/types/carrier";
import { IApiResponse } from "@/shared/services/api";
import { CarrierService } from "@/shared/services/carrier";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useCarrier() {
  return useQuery<IApiResponse<ICarrier[]>>({
    queryKey: [QueryKeysEnum.Carrier],
    queryFn: CarrierService.getAll,
    staleTime: 60 * 5 * 1000,
  });
}
