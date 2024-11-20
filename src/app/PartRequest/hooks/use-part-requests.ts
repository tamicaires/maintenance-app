import { IPartRequest } from "@/interfaces/part-request";
import { IApiResponse } from "@/services/api";
import { PartRequestService } from "@/services/part-request";
import { useQuery } from "@tanstack/react-query";

export function usePartRequests() {
  return useQuery<IApiResponse<IPartRequest[]>>({
    queryKey: ["part-requests"],
    queryFn: () => PartRequestService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
