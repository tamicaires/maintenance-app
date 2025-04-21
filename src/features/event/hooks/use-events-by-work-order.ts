import { useQuery } from "@tanstack/react-query";
import { IEventRelationalData } from "@/shared/types/event";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { eventService } from "@/shared/services/event-service/event";

export function useEventByWorkOrder(workOrderId: string) {
  const { data, isLoading, error } = useQuery<IEventRelationalData[]>({
    queryKey: [QueryKeysEnum.Event, QueryKeysEnum.Work_Order, workOrderId],
    queryFn: () => eventService.getByWorkOrder(workOrderId),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
}
