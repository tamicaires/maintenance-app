import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Wrench, Package, CheckCircle } from 'lucide-react'
import { IWorkOrder } from "@/shared/types/work-order.interface"

type MobileWorkOrderOverviewProps = {
  workOrder: IWorkOrder
  statusInfo: any
}

export function MobileWorkOrderOverview({ workOrder, statusInfo }: MobileWorkOrderOverviewProps) {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-base">Informações da Frota</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Número</p>
              <p className="text-sm font-semibold">{workOrder.fleetInfo.fleetNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Placa</p>
              <p className="text-sm font-semibold">{'placa'|| 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Box</p>
              <p className="text-sm font-semibold">{workOrder.box?.id || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold">{statusInfo.label}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-base">Linha do Tempo</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-3">
            {[
              { label: "Entrada na Fila", date: workOrder.entryQueue, icon: Clock, color: "yellow" },
              { label: "Entrada na Manutenção", date: workOrder.entryMaintenance, icon: Wrench, color: "blue" },
              { label: "Aguardando Peças", date: workOrder.startWaitingParts, icon: Package, color: "orange" },
              { label: "Saída da Manutenção", date: workOrder.exitMaintenance, icon: CheckCircle, color: "green" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className={`p-1.5 rounded-full bg-${item.color}-100 mt-0.5`}>
                  <item.icon className={`h-3 w-3 text-${item.color}-500`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date ? format(new Date(item.date), "dd/MM/yyyy HH:mm") : "Pendente"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}