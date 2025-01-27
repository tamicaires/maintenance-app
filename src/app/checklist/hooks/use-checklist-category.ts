import { IApiResponse } from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { IChecklistCategory } from "@/shared/types/checklist";
import { ChecklistCategoryService } from "@/services/checklist/checklist-category";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useChecklistCategory(templateId: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IChecklistCategory[]>>({
    queryKey: [QueryKeysEnum.ChecklistCategory, templateId],
    queryFn: () => ChecklistCategoryService.getByTemplateId(templateId),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

