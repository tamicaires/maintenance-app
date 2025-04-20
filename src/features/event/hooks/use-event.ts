import { useQuery } from "@tanstack/react-query";
import { IEventRelationalData } from "@/shared/types/event";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { eventService } from "@/shared/services/event-service/event";


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
  const { data, isLoading, error } = useQuery<IEventRelationalData[]>({
    queryKey: [QueryKeysEnum.Event, QueryKeysEnum.Checklist, params],
    queryFn: () => eventService.list(params),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
}
