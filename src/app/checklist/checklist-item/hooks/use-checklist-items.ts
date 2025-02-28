import type { IApiResponse } from "@/shared/services/api"
import { useQuery } from "@tanstack/react-query"
import type { IChecklistItem } from "@/shared/types/checklist"
import { ChecklistItemService } from "@/shared/services/checklist/checklist-item"
import { QueryKeysEnum } from "@/shared/enums/query-keys"

export function useChecklistItems(checklistId: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IChecklistItem[]>>({
    queryKey: [QueryKeysEnum.ChecklistItem, checklistId],
    queryFn: () => ChecklistItemService.getByChecklist(checklistId),
    staleTime: 60 * 5 * 1000,
  })

  return { data, isLoading, error }
}

