import { IApiResponse } from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { IChecklist } from "@/shared/types/checklist";
import { ChecklistService } from "@/services/checklist/checklist";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useChecklist() {
  const { data, isLoading, error } = useQuery<IApiResponse<IChecklist[]>>({
    queryKey: [QueryKeysEnum.Checklist, QueryKeysEnum.Event],
    queryFn: ChecklistService.getAll,
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

