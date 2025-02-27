import { CheckCircleIcon, ClockIcon, Eye, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { calculateDuration } from "@/utils/work-order";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { formatDuration } from "@/utils/time";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { WorkOrderDetails } from "@/app/work-order/components/work-order-details";

interface MaintenanceCardProps {
  box: IBoxWithRelationalData;
}

export function MaintenanceCard({ box }: MaintenanceCardProps) {
  const maintenanceDuration = calculateDuration(box.workOrder.entryMaintenance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative h-full flex flex-col overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-foreground" />
        <CardContent className="pt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary text-primary-foreground rounded-full">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">
                  Frota {box.workOrder.fleet.fleetNumber}
                </h3>
                <p className="text-xs text-muted-foreground"></p>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <div className="absolute -top-12 -right-4 text-8xl font-bold text-primary opacity-10 select-none">
              {box.name}
            </div>
            <div className="text-3xl font-bold text-primary">
              Box {box.name}
            </div>
          </div>

          <div className="space-y-2 text-sm mb-4">
            <div>
              <span className="text-xs font-medium text-muted-foreground">
                Entrada
              </span>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {box.workOrder.entryMaintenance
                    ? format(
                        new Date(box.workOrder.entryMaintenance),
                        "dd/MM HH:mm",
                        { locale: ptBR }
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
            {maintenanceDuration && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  Tempo de Manutenção
                </span>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDuration(maintenanceDuration, { format: "hm" })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="font-medium">Progresso</span>
              <span className="text-muted-foreground">{box.progress.toFixed()}%</span>
            </div>
            <Progress value={box.progress} className="h-1" />
          </div>
          <WorkOrderDetails
            workOrderId={box.workOrder.id}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Eye className="h-4 w-4 mr-2" />
                Detalhes
              </Button>
            }
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
