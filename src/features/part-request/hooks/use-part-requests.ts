import { useQuery } from "@tanstack/react-query"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { queryClient } from "@/shared/services/query-client"
import { IPartRequestsRelationalDataList } from "@/shared/types/part-request-relational-data"
import { RequestStatus } from "@/shared/enums/part-request"
import { partRequestService } from "@/shared/services/part-request-service/part-request"

export interface IPartRequestFilters {
  page?: string
  perPage?: string
  status?: RequestStatus
  startDate?: string
  endDate?: string
}

export function usePartRequests(filters: IPartRequestFilters = {}) {
  const { data, isLoading, error } = useQuery<IPartRequestsRelationalDataList>({
    queryKey: [QueryKeysEnum.Part_Request, filters],
    queryFn: () => partRequestService.getPaginated(filters),
    staleTime: 60 * 5 * 1000,
  })

  const invalidatePartRequests = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Part_Request] })
  }

  return { data, isLoading, error, invalidatePartRequests }
}

