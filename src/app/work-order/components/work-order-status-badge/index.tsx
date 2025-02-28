import { IWorkOrder } from "@/shared/types/work-order.interface";
import { Button } from "@/components/ui/button";
import {
  getMaintenanceStatusInfo,
  validateWorkOrderState,
} from "@/utils/work-order";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  ChevronDown,
  CornerUpLeft,
  Pause,
  Wrench,
  XCircle,
} from "lucide-react";
import { StartWaitingPartsDialog } from "@/app/work-order/components/actions-dialogs/start-waiting-parts-dialog";
import { StartMaintenanceDialog } from "@/app/work-order/components/actions-dialogs/start-maintenace-dialog";
import { FinishWaitingPartsDialog } from "@/app/work-order/components/actions-dialogs/finish-waiting-parts";

interface WorkOrderStatusBadgeProps {
  workOrder: IWorkOrder;
}

export default function WorkOrderStatusBadge({
  workOrder,
}: WorkOrderStatusBadgeProps) {
  const {
    isInQueueWorkOrder,
    isWaitingPartsWorkOrder,
    isInMaintenanceWorkOrder,
    isClosedWorkOrder,
  } = validateWorkOrderState(workOrder.status);
  const statusInfo = getMaintenanceStatusInfo(workOrder.status);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            className={`justify-between text-sm bg-${statusInfo.color}-600/10 text-${statusInfo.color}-600 border-${statusInfo.color}-300 bg-opacity-15`}
          >
            <span className="flex items-center">
              <statusInfo.icon className="mr-2 h-4 w-4" />
              {workOrder.status.toUpperCase()}
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Ações da OS</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isInQueueWorkOrder && (
            <StartMaintenanceDialog
              workOrderId={workOrder.id}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Wrench className="mr-2 h-3.5 w-3.5" />
                  Iniciar Manutenção
                </DropdownMenuItem>
              }
            />
          )}
          {isInMaintenanceWorkOrder && (
            <>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <CornerUpLeft className="mr-2 h-3.5 w-3.5" />
                Voltar para fila
              </DropdownMenuItem>
              <StartWaitingPartsDialog workOrderId={workOrder.id}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pause className="mr-2 h-3.5 w-3.5" />
                  Iniciar Aguardar Peça
                </DropdownMenuItem>
              </StartWaitingPartsDialog>
            </>
          )}
          {isWaitingPartsWorkOrder && (
            <DropdownMenuItem>
              <FinishWaitingPartsDialog
                workOrderId={workOrder.id}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Wrench className="mr-2 h-3.5 w-3.5" />
                    Retomar Manutenção
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuItem>
          )}
          {!isClosedWorkOrder && (
            <DropdownMenuItem
              className="text-red-600"
              onSelect={(e) => e.preventDefault()}
            >
              <XCircle className="mr-2 h-3.5 w-3.5" />
              Cancelar OS
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
