import { IApiResponse } from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { IChecklistTemplate } from "@/shared/types/checklist";
import { ChecklistTemplateService } from "@/services/checklist/checklist-template";

export function useChecklistTemplate() {

  const { data, isLoading, error } = useQuery<IApiResponse<IChecklistTemplate[]>>({
    queryKey: ['checklist-templates'],
    queryFn: ChecklistTemplateService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

