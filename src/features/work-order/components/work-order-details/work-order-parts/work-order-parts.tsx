import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { BatchPartRequestDialog } from "@/features/part-request/components/create-batch-part-request/create-batch-part-request";
import { usePartRequestByWorkOrderId } from "@/features/part-request/hooks/use-part-request-by-work-order-id";
import { Spinner } from "@/components/Spinner";
import PartRequestList from "@/features/part-request/components/part-request-table/part-request-list";

type PartRequestsProps = {
  workOrder: IWorkOrder;
};
export function WorkOrderParts({ workOrder }: PartRequestsProps) {
  const { data, isLoading } = usePartRequestByWorkOrderId(workOrder.id);

  const partRequests = data || [];
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
          trailers={workOrder.fleet.trailers}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <PartRequestList partRequests={partRequests} />
        )}
      </CardContent>
    </Card>
  );
}
