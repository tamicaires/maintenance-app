import { IApiResponse } from "@/shared/services/api";
import { useQuery } from "@tanstack/react-query";
import { IEventRelationalData } from "@/shared/types/event";
import { EventService } from "@/shared/services/event";
import { QueryKeysEnum } from "@/shared/enums/query-keys";


interface UseEventParams {
  page: string;
  perPage: string;
  checklistId?: string;
  event?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
}

export function useEvent(params: UseEventParams) {
  const { data, isLoading, error } = useQuery<IApiResponse<IEventRelationalData[]>>({
    queryKey: [QueryKeysEnum.Event, QueryKeysEnum.Checklist, params],
    queryFn: () => EventService.list(params),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
}
