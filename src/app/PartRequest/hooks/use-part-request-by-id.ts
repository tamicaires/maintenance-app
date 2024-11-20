import { useQuery } from "@tanstack/react-query";
import { IApiResponse } from "@/services/api";
import { IPartRequest } from "@/interfaces/part-request";
import { PartRequestService } from "@/services/part-request";

export function usePartRequestById(id: string) {
  return useQuery<IApiResponse<IPartRequest>>({
    queryKey: ["part-requests", id],
    queryFn: () => PartRequestService.getById(id),
    staleTime: 60 * 5 * 1000, 
  });
}
