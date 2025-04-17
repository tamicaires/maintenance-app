import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { HistoryItem } from "./work-order-history-item";
import { useEventByWorkOrder } from "@/features/event/hooks/use-events-by-work-order";
import { getDataOrDefault } from "@/utils/data";
import { IEventRelationalData } from "@/shared/types/event";
import {
  IUpdatesTimeline,
} from "@/components/UpdatesTimeLine";
import { transformEventToUpdate } from "@/utils/event";

export function WorkOrderHistory({ workOrder }: { workOrder: IWorkOrder }) {
  const { data: historyData } = useEventByWorkOrder(workOrder.id);
  const eventHistory = getDataOrDefault<IEventRelationalData[]>(
    historyData,
    [],
    "data"
  );

  const events: IUpdatesTimeline[] = eventHistory.map(transformEventToUpdate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico da Ordem de Serviço</CardTitle>
        <CardDescription>Registro completo de atividades</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {events.map((event) => event.date && <HistoryItem event={event} />)}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
