import { format } from "date-fns"
import { Settings, AlertTriangle, Clock, Wrench, Package, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { IWorkOrder } from "@/interfaces/work-order.interface"
import { SeverityLevel } from "@/shared/enums/work-order"
import { cn } from "@/lib/utils"

export function WorkOrderOverview({ workOrder }: { workOrder: IWorkOrder }) {
  const timelineEvents = [
    { icon: Clock, label: "Entrada na Fila", date: workOrder.entryQueue, color: "yellow" },
    { icon: Wrench, label: "Entrada na Manutenção", date: workOrder.entryMaintenance, color: "blue" },
    { icon: Package, label: "Aguardando Peças", date: workOrder.startWaitingParts, color: "orange" },
    { icon: CheckCircle, label: "Saída da Manutenção", date: workOrder.exitMaintenance, color: "green" },
  ]

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Informações da Frota</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 items-start justify-between">
            <div className="flex flex-col items-center justify-between">
              <span className="text-sm text-muted-foreground">Número</span>
              <span className="font-medium">{workOrder.fleetInfo.fleetNumber}</span>
            </div>
            <div className="flex flex-col items-center justify-between">
              <span className="text-sm text-muted-foreground">Placa</span>
              <span className="font-medium">OTB-5482</span>
            </div>
            <div className="flex flex-col items-center justify-between">
              <span className="text-sm text-muted-foreground">Box</span>
              <span className="font-medium">01</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Transportadora</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${workOrder.fleetInfo.carrierName}`} />
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{workOrder.fleetInfo.carrierName}</p>
              <p className="text-sm text-muted-foreground">Transportadora Ativa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Tipo de Manutenção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              <span className="font-medium">{workOrder.typeOfMaintenance}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className={cn(
                "w-4 h-4",
                workOrder.severityLevel === SeverityLevel.BAIXA && "text-green-500",
                workOrder.severityLevel === SeverityLevel.NORMAL && "text-blue-500",
                workOrder.severityLevel === SeverityLevel.ALTA && "text-orange-500",
                workOrder.severityLevel === SeverityLevel.URGENTE && "text-red-500"
              )} />
              <span className="text-sm text-muted-foreground">Severidade: {workOrder.severityLevel}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Linha do Tempo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            {timelineEvents.map((item, index) => (
              <div key={index} className="relative pl-8">
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-[0.9375rem] top-8 h-full w-px bg-border" />
                )}
                <div className={`absolute left-0 rounded-full p-1.5 bg-${item.color}-100`}>
                  <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.date ? format(new Date(item.date), "dd/MM/yyyy HH:mm") : "Pendente"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <MetricItem label="Tempo Total" value={`${workOrder.maintenanceDuration || 0} min`} />
            <MetricItem label="Peças Solicitadas" value={`${4 || 0} peças`} />
            <MetricItem label="Serviços Realizados" value={`${5 || 0} serviços`} />
            <MetricItem label="Técnicos Envolvidos" value={`${8 || 0} técnicos`} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">
        {value.split(' ')[0]}
        <span className="text-sm text-muted-foreground ml-1">{value.split(' ')[1]}</span>
      </p>
    </div>
  )
}