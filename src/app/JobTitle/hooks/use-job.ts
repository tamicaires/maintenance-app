import { IJob } from "@/shared/types/job.interface";
import { IApiResponse } from "@/services/api";
import { JobService } from "@/services/job";
import { useQuery } from "@tanstack/react-query";

export function useJobTitle(page: number = 1, perPage: number = 10) {
  return useQuery<IApiResponse<IJob[]>>({
    queryKey: ["jobs", page, perPage],
    queryFn: () => JobService.getAll(page, perPage),
    staleTime: 60 * 5 * 1000,
  });
}
