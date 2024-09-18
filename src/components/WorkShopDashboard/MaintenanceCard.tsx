import { CheckCircleIcon, ClockIcon, Eye, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { calculateMaintenanceDuration } from "@/utils/work-order";
import { boxToNumber } from "@/utils/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { formatDuration } from "@/utils/time";

interface MaintenanceCardProps {
  workOrder: IWorkOrder;
  onShowDetails: (workOrder: IWorkOrder) => void;
}

export function MaintenanceCard({
  workOrder,
  onShowDetails,
}: MaintenanceCardProps) {
  const maintenanceDuration = calculateMaintenanceDuration(workOrder);
  const progress = 65;

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
                <h3 className="font-semibold">Frota {workOrder.fleetNumber}</h3>
                <p className="text-xs text-muted-foreground">
                  {workOrder.typeOfMaintenance}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <div className="absolute -top-12 -right-4 text-8xl font-bold text-primary opacity-10 select-none">
              {boxToNumber(workOrder.box)}
            </div>
            <div className="text-3xl font-bold text-primary">
              Box {boxToNumber(workOrder.box)}
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
                  {workOrder.entryMaintenance
                    ? format(
                        new Date(workOrder.entryMaintenance),
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
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onShowDetails(workOrder)}
            className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="h-4 w-4 mr-2" />
            Detalhes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
