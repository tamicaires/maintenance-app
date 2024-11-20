import { Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IWorkOrder } from "@/interfaces/work-order.interface"

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
]

export function WorkOrderHistory({ workOrder }: { workOrder: IWorkOrder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico da Ordem de Serviço</CardTitle>
        <CardDescription>Registro completo de atividades</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {mockHistory.map((event, index) => (
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}