import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { BatchPartRequestDialog } from "@/app/part-request/components/create-batch-part-request/create-batch-part-request";
import { usePartRequestByWorkOrderId } from "@/app/part-request/hooks/use-part-request-by-work-order-id";
import { Spinner } from "@/components/Spinner";
import WorkOrderPartRequestItem from "@/components/WorkOrderPartRequestItem";
import EmptyState from "@/components/EmptyState";

type PartRequestsProps = {
  workOrder: IWorkOrder;
};
export function WorkOrderParts({ workOrder }: PartRequestsProps) {
  const { data, isLoading } = usePartRequestByWorkOrderId(workOrder.id);

  const partRequests = data?.data || [];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Peças</CardTitle>
          <CardDescription>Peças solicitadas para esta ordem</CardDescription>
        </div>
        <BatchPartRequestDialog
          workOrderDisplayId={workOrder.displayId}
          workOrderId={workOrder.id}
          trailers={workOrder.fleetInfo.trailers}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : partRequests.length > 0 ? (
          <div className="space-y-6">
            {partRequests.map((partRequest, index) => (
              <WorkOrderPartRequestItem
                key={partRequest.id}
                partRequest={partRequest}
                index={index}
                totalRequests={partRequests.length}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="Nenhuma solicitação de peça em aberto" />
        )}
      </CardContent>
    </Card>
  );
}