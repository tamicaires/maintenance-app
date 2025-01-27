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
import { HistoryItem } from "./work-order-history-item";

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
