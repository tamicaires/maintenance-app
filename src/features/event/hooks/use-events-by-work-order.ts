import { IApiResponse } from "@/shared/services/api";
import { useQuery } from "@tanstack/react-query";
import { IEventRelationalData } from "@/shared/types/event";
import { EventService } from "@/shared/services/event";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useEventByWorkOrder(workOrderId: string) {
  const { data, isLoading, error } = useQuery<IApiResponse<IEventRelationalData[]>>({
    queryKey: [QueryKeysEnum.Event, QueryKeysEnum.Work_Order, workOrderId],
    queryFn: () => EventService.getByWorkOrder(workOrderId),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
}
