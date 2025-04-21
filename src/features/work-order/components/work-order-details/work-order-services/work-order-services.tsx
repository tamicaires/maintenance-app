import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { ServiceAssignmentCreationDialog } from "@/features/service-assigment/components/create-service-assignment-form";
import { Spinner } from "../../../../../components/Spinner";
import { useServiceAssigmentsByWorkOrder } from "@/features/service-assigment/hooks/use-service-assigments-by-order";
import ServiceAssigmentList from "@/features/service-assigment/components/service-assigment-list/service-assigment-list";
import { MaintenanceStatus } from "@/shared/enums/work-order";

type WorkOrderServicesProps = {
  workOrder: IWorkOrder;
};

export function WorkOrderServices({ workOrder }: WorkOrderServicesProps) {
  const { data, isLoading } = useServiceAssigmentsByWorkOrder(workOrder.id);
  const serviceAssigments = data || [];

  const isStatusClosed =
    workOrder.status === MaintenanceStatus.FINALIZADA ||
    workOrder.isCancelled === true;
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
          <ServiceAssignmentCreationDialog
            workOrderId={workOrder.id}
            trailers={workOrder.fleet.trailers}
            isDisabled={isStatusClosed}
          />
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <ServiceAssigmentList serviceAssigments={serviceAssigments} />
        )}
      </CardContent>
    </Card>
  );
}
