import { IApiResponse } from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { IChecklistItemTemplate } from "@/shared/types/checklist";
import { ChecklistTemplateItemService } from "@/services/checklist/checklist-template-item";

export function useChecklistTemplateItemByTemplateId(templateId: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IChecklistItemTemplate[]>>({
    queryKey: ['checklist-items', templateId],
    queryFn: () => ChecklistTemplateItemService.getByTemplateId(templateId),
    staleTime: 60 * 5 * 1000,
    enabled: !!templateId,
  });

  return { data, isLoading, error };
}

