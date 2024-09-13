import { IService } from "@/interfaces/service.interface";
import { IApiResponse } from "@/services/api";
import { ServicesService } from "@/services/service";
import { useQuery } from "@tanstack/react-query";

export function useService() {
  return useQuery<IApiResponse<IService[]>>({
    queryKey: ["services"],
    queryFn: () => ServicesService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
