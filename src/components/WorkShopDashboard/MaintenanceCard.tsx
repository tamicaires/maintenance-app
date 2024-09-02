import { CheckCircleIcon, ClockIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { calculateMaintenanceDuration } from "@/utils/work-order";

interface MaintenanceCardProps {
  workOrder: IWorkOrder;
  onStatusChange: (id: string, status: string) => void;
  onShowDetails: (workOrder: IWorkOrder) => void;
}

export function MaintenanceCard({
  workOrder,
  onStatusChange,
  onShowDetails,
}: MaintenanceCardProps) {
  const maintenanceDuration = calculateMaintenanceDuration(workOrder);
  const progress = 65;
  return (
    <Card className="relative h-full">
      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-sm font-bold rounded-bl-lg rounded-tr-lg">
        Box {workOrder.box}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              Frota {workOrder.fleetNumber}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {workOrder.typeOfMaintenance}
            </p>
          </div>
          <Badge
            variant={
              workOrder.status === "Manutencao" ? "destructive" : "secondary"
            }
            className={`mt-4 ${
              workOrder.status === "Manutencao"
                ? "bg-blue-500 bg-opacity-15 text-blue-500"
                : "secondary"
            }`}
          >
            {workOrder.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" /> Entrada:{" "}
            {workOrder.entryMaintenance}
          </div>
          <div className="flex items-center text-sm">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" /> Duração:{" "}
            {maintenanceDuration}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShowDetails(workOrder)}
          >
            Detalhes
          </Button>
          {workOrder.status === "Manutencao" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusChange(workOrder.id, "Liberado")}
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Marcar como Liberado</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
