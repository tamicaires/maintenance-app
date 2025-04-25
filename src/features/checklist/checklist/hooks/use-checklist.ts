import { useQuery } from '@tanstack/react-query';
import { IChecklist } from "@/shared/types/checklist";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { checklistService } from "@/shared/services/checklist/checklist-service";

export function useChecklist() {
  const { data, isLoading, error } = useQuery<IChecklist[]>({
    queryKey: [QueryKeysEnum.Checklist, QueryKeysEnum.Event],
    queryFn: () => checklistService.getAll(),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

