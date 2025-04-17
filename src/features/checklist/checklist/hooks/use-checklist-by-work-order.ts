import { IApiResponse } from "@/shared/services/api";
import { useQuery } from '@tanstack/react-query';
import { ChecklistService } from "@/shared/services/checklist/checklist";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist";

export function useChecklistByWorkOrder(workOrderId: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IChecklistWithRelationalData | null>>({
    queryKey: [QueryKeysEnum.Checklist, QueryKeysEnum.Event, workOrderId],
    queryFn: () => ChecklistService.getByWorkOrder(workOrderId),
    staleTime: 60 * 5 * 1000,
  });

  return { data, isLoading, error };
}

