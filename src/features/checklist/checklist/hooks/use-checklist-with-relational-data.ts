import type { IApiResponse } from "@/shared/services/api"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { ChecklistService } from "@/shared/services/checklist/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import type { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist"

type UseChecklistWithRelationalDataOptions = Omit<
  UseQueryOptions<IApiResponse<IChecklistWithRelationalData>, Error>,
  "queryKey" | "queryFn"
>

export function useChecklistWithRelationalData(checklistId: string, options?: UseChecklistWithRelationalDataOptions) {
  const { data, isLoading, error, isError, isSuccess } = useQuery<IApiResponse<IChecklistWithRelationalData>, Error>({
    queryKey: [QueryKeysEnum.Checklist, checklistId],
    queryFn: () => ChecklistService.getWithRelationalData(checklistId),
    staleTime: 60 * 5 * 1000,
    ...options,
  })

  return { data, isLoading, isError, isSuccess, error }
}

