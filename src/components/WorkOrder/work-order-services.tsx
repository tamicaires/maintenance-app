import { PlusCircle, User, Timer, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IWorkOrder } from "@/interfaces/work-order.interface"
import { cn } from "@/lib/utils"

const mockServices = [
  {
    id: "1",
    name: "Troca de Óleo",
    status: "Concluído",
    duration: "1h 30m",
    technician: "João Silva",
    startedAt: "2024-01-15T10:00:00",
    completedAt: "2024-01-15T11:30:00",
    notes: "Óleo 15W40 utilizado",
    priority: "Alta",
    cost: 250.0,
  },
  // ... other services
]

export function WorkOrderServices({ workOrder }: { workOrder: IWorkOrder }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Serviços</CardTitle>
          <CardDescription>Lista de serviços realizados nesta ordem</CardDescription>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar Serviço
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockServices.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "p-4 rounded-lg border bg-card transition-colors hover:bg-accent",
                index !== mockServices.length - 1 && "mb-4"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{service.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {service.technician}
                    </span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      {service.duration}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    service.status === "Concluído" && "bg-green-100 text-green-800",
                    service.status === "Em Andamento" && "bg-blue-100 text-blue-800",
                    service.status === "Pendente" && "bg-yellow-100 text-yellow-800"
                  )}
                >
                  {service.status}
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>Início: {new Date(service.startedAt).toLocaleString()}</span>
                  {service.completedAt && (
                    <>
                      <span>•</span>
                      <span>Fim: {new Date(service.completedAt).toLocaleString()}</span>
                    </>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  Ver Detalhes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}