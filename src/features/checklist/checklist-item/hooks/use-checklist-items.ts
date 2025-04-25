import { useQuery } from "@tanstack/react-query"
import type { IChecklistItem } from "@/shared/types/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { checklistItemService } from "@/shared/services/checklist/checklist-item-service"

export function useChecklistItems(checklistId: string) {
  const { data, isLoading, error } = useQuery<IChecklistItem[]>({
    queryKey: [QueryKeysEnum.ChecklistItem, checklistId],
    queryFn: () => checklistItemService.getByChecklist(checklistId),
    staleTime: 60 * 5 * 1000,
  })

  return { data, isLoading, error }
}

