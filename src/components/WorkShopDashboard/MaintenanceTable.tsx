import { CheckCircleIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { calculateMaintenanceDuration } from "@/utils/work-order";
import { MaintenanceStatus } from "@/shared/enums/work-order";

interface MaintenanceTableProps {
  workOrders: IWorkOrder[];
  onStatusChange: (id: string, status: string) => void;
  onShowDetails: (workOrder: any) => void;
}

export function MaintenanceTable({
  workOrders,
  onStatusChange,
  onShowDetails,
}: MaintenanceTableProps) {
  const progress = 65;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Frota</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Entrada</TableHead>
          <TableHead>Duração</TableHead>
          <TableHead>Progresso</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workOrders.map((workOrder) => (
          <TableRow key={workOrder.id}>
            <TableCell className="font-medium">
              {workOrder.fleetNumber}
            </TableCell>
            <TableCell>{workOrder.typeOfMaintenance}</TableCell>
            <TableCell>{workOrder.entryQueue}</TableCell>
            <TableCell>{calculateMaintenanceDuration(workOrder)}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Progress value={progress} className="w-[60px]" />
                <span className="text-sm">{progress}%</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  workOrder.status === MaintenanceStatus.MANUTENCAO ? "default" : "secondary"
                }
                className={`${
                  workOrder.status === MaintenanceStatus.MANUTENCAO
                    ? "bg-blue-500 bg-opacity-15 text-blue-500"
                    : "secondary"
                }`}
              >
                {workOrder.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onShowDetails(workOrder)}
                >
                  Detalhes
                </Button>
                {workOrder.status === MaintenanceStatus.MANUTENCAO && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            onStatusChange(workOrder.id, "Liberado")
                          }
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
