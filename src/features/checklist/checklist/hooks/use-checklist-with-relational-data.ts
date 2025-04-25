import { useQuery } from "@tanstack/react-query"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import type { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist"
import { checklistService } from "@/shared/services/checklist/checklist-service"

export function useChecklistWithRelationalData(checklistId: string) {
  const { data, isLoading, error, isError, isSuccess } = useQuery<IChecklistWithRelationalData>({
    queryKey: [QueryKeysEnum.Checklist, checklistId],
    queryFn: () => checklistService.getWithRelationalData(checklistId),
    staleTime: 60 * 5 * 1000,
    // enabled
  })

  return { data, isLoading, isError, isSuccess, error }
}

