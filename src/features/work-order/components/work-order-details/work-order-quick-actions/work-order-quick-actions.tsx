import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { IWorkOrder } from "@/shared/types/work-order.interface";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { StartMaintenanceDialog } from "../../actions-dialogs/start-maintenace-dialog";
import { FinishMaintenanceDialog } from "../../actions-dialogs/finish-maintenance-dialog";
import { validateWorkOrderState } from "@/utils/work-order";
import { FinishWaitingPartsDialog } from "../../actions-dialogs/finish-waiting-parts";

type WorkOrderQuickActionsProps = {
  workOrder: IWorkOrder;
  onClose: () => void;
};

export function WorkOrderQuickActions({
  workOrder,
  onClose,
}: WorkOrderQuickActionsProps) {
  const isInQueue = workOrder.status === MaintenanceStatus.FILA;
  const isInProgress = workOrder.status === MaintenanceStatus.MANUTENCAO;

  const { isWaitingPartsWorkOrder } = validateWorkOrderState(workOrder.status);
  return (
    <div className="fixed bottom-0 w-full border-t bg-background/80 backdrop-blur-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${workOrder.createdAt}`}
              />
              <AvatarFallback>
                {workOrder.createdAt?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Última atualização</p>
              <p className="text-muted-foreground">
                {format(new Date(workOrder.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {isInQueue && (
            <StartMaintenanceDialog
              workOrderId={workOrder.id}
              trigger={<Button>Iniciar Manutenção</Button>}
            />
          )}
          {isInProgress && (
            <FinishMaintenanceDialog workOrderId={workOrder.id}>
              <Button>Finalizar Manutenção</Button>
            </FinishMaintenanceDialog>
          )}
          {isWaitingPartsWorkOrder && (
            <FinishWaitingPartsDialog
              workOrderId={workOrder.id}
              trigger={<Button>Retornar Manutenção</Button>}
            />
          )}
        </div>
      </div>
    </div>
  );
}
