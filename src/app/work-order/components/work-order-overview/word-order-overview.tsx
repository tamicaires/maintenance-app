import {
  Settings,
  AlertTriangle,
  Package,
  PenToolIcon as Tool,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { SeverityLevel } from "@/shared/enums/work-order";
import { cn } from "@/lib/utils";
import { WorkOrderNotes } from "@/app/note";
import { WorkOrderStats } from "../work-order-stats/work-order-stats";
import { useServiceAssigments } from "@/app/service-assigment/hooks/use-service-assigments";

export function WorkOrderOverview({ workOrder }: { workOrder: IWorkOrder }) {
  const { data } = useServiceAssigments(workOrder.id);
  const serviceAssignments = data?.data || [];
  return (
    <div className="min-h-screen bg-background p-1">
      <div className="gap-1">
        <div className="grid grid-cols-3 gap-2 justify-between">
          {/* Fleet Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Frota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Número da Frota
                    </p>
                    <p className="text-2xl font-bold">
                      {workOrder.fleetInfo.fleetNumber}
                    </p>
                  </div>
                  {workOrder.box && (
                    <div>
                      <p className="text-sm text-muted-foreground">Box</p>
                      <p className="text-2xl font-bold text-right">
                        {workOrder.box.name}
                      </p>
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${workOrder.fleetInfo.carrierName}`}
                      />
                      <AvatarFallback>
                        {workOrder.fleetInfo.carrierName
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {workOrder.fleetInfo.carrierName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Transportadora
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Info Card */}
          <Card>
            <CardContent>
              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {workOrder.typeOfMaintenance}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityIndicator
                    level={workOrder.severityLevel as SeverityLevel}
                  />
                  <span className="text-sm">
                    Nível de Severidade: {workOrder.severityLevel}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <Progress value={65} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Em andamento</span>
                      <span>65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="flex flex-col gap-2.5">
            <QuickStatCard
              title="Peças"
              value="4"
              unit="itens"
              icon={Package}
              trend="down"
              trendValue="5%"
            />
            <QuickStatCard
              title="Serviços Realizados"
              value="5"
              unit="total"
              icon={Tool}
              trend="up"
              trendValue="8%"
            />
            <QuickStatCard
              title="Técnicos Envolvidos"
              value="8"
              unit="ativos"
              icon={Users}
              trend="up"
              trendValue="2%"
            />
          </div>
        </div>

        {/* Notes and Stats Section */}
        <div className="grid grid-cols-2 gap-4 pt-6">
          <WorkOrderStats serviceAssignments={serviceAssignments} />
          <WorkOrderNotes workOrderId={workOrder.id} notes={workOrder.notes} />
        </div>
      </div>
    </div>
  );
}

function QuickStatCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  unit: string;
  icon: any;
  trend: "up" | "down";
  trendValue: string;
}) {
  console.log(unit, trend)
  trendValue
  return (
    <Card>
      <CardContent className="px-6 py-2">
        <div className="flex gap-4 items-center justify-between">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="text-right">

            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SeverityIndicator({ level }: { level: SeverityLevel }) {
  const severityConfig = {
    [SeverityLevel.BAIXA]: { color: "text-green-500" },
    [SeverityLevel.NORMAL]: { color: "text-blue-500" },
    [SeverityLevel.ALTA]: { color: "text-orange-500" },
    [SeverityLevel.URGENTE]: { color: "text-red-500" },
  };

  return (
    <AlertTriangle className={cn("w-5 h-5", severityConfig[level].color)} />
  );
}
