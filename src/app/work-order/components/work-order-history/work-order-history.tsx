import { CheckCircle, Clock, Pause, UndoDot, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { getMaintenanceStatusInfo } from "@/utils/work-order";
import { HistoryItem, HistoryItemProps } from "./work-order-history-item";

const mockHistory = [
  {
    id: "1",
    date: "2024-01-15T09:00:00",
    type: "status_change",
    description: "Status atualizado para: Em Manutenção",
    user: "João Silva",
    details: "Início dos trabalhos de manutenção preventiva",
  },
  // ... other history events
];

export function WorkOrderHistory({ workOrder }: { workOrder: IWorkOrder }) {
  const history = [
    {
      id: "1",
      date: workOrder.entryQueue,
      description: "Frota recebida em Fila",
      user: "João Silva",
      details: "Aguardando inicio da manutenção",
      icon: Clock,
      color: "yellow",
    },
    {
      id: "2",
      date: workOrder.entryMaintenance,
      description: "Manutenção iniciada",
      user: "João Silva",
      details: "Início do periodo de manutenção",
      icon: Wrench,
      color: "blue",
    },
    {
      id: "3",
      date: workOrder.startWaitingParts,
      description: "Manutenção parou",
      user: "João Silva",
      details: "Início do periodo de aguardando peças",
      icon: Pause,
      color: "red",
    },
    {
      id: "4",
      date: workOrder.endWaitingParts,
      description: "Retorno da Manutenção",
      user: "João Silva",
      details: "Fim do periodo de aguardando peças",
      icon: UndoDot,
      color: "orange",
    },
    {
      id: "5",
      date: workOrder.exitMaintenance,
      description: "Frota liberada",
      user: "João Silva",
      details: "Fim do periodo de manutenção",
      icon: CheckCircle,
      color: "green",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico da Ordem de Serviço</CardTitle>
        <CardDescription>Registro completo de atividades</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {/* {mockHistory.map((event, index) => (
              <div key={event.id} className="relative pl-8">
                <div className="absolute left-0 rounded-full p-2 bg-muted">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleString()}
                  </p>
                  <p className="font-medium">{event.description}</p>
                  <p className="text-sm text-muted-foreground">{event.user}</p>
                  <p className="text-sm">{event.details}</p>
                </div>
                {index < mockHistory.length - 1 && (
                  <div className="absolute left-[0.9375rem] top-8 h-full w-px bg-border" />
                )}
              </div>
            ))} */}
            {history.map(
              (event) =>
                event.date && (
                  <HistoryItem
                    id={event.id}
                    date={event.date}
                    description={event.description}
                    user={event.user}
                    details={event.details}
                    icon={event.icon}
                    color={event.color}
                  />
                )
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
