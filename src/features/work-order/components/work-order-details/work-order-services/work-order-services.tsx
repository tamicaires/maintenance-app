import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { ServiceAssignmentCreation } from "@/features/service-assigment/components/create-service-assignment";
import { useServiceAssigmentsByWorkOrder } from "@/features/service-assigment/hooks/use-service-assigments-by-order";
import ServiceAssigmentList from "@/features/service-assigment/components/service-assigment-list/service-assigment-list";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { useDialog } from "@/core/providers/dialog";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { LoadingOverlay } from "@/components/loading-overlay";

type WorkOrderServicesProps = {
  workOrder: IWorkOrder;
};

export function WorkOrderServices({ workOrder }: WorkOrderServicesProps) {
  const { openDialog } = useDialog();

  const { data, isLoading } = useServiceAssigmentsByWorkOrder(workOrder.id);
  const serviceAssigments = data || [];

  const isStatusClosed =
    workOrder.status === MaintenanceStatus.FINALIZADA ||
    workOrder.isCancelled === true;

  const handleOpenCreateService = () => {
    openDialog({
      title: "Criar Desginação de serviços",
      content: (
        <ServiceAssignmentCreation
          workOrderId={workOrder.id}
          trailers={workOrder.fleet.trailers}
        />
      ),
      stackable: true,
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Serviços</CardTitle>
          <CardDescription>
            Lista de serviços realizados nesta ordem
          </CardDescription>
        </div>
        {!isStatusClosed && (
          <Button disabled={isStatusClosed} onClick={handleOpenCreateService}>
            <Wrench className="mr-2 h-4 w-4" /> Adicionar Serviço
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <LoadingOverlay isLoading={isLoading}>
          <ServiceAssigmentList serviceAssigments={serviceAssigments} />
        </LoadingOverlay>
      </CardContent>
    </Card>
  );
}
