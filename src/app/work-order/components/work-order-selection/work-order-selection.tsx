import {
  CardSelectionOption,
  CardSelectorDialog,
} from "@/components/card-selector/card-selector";
import { IWorkOrder } from "@/shared/types/work-order.interface";

export interface WorkOrderSelectionProps {
  workOrders: IWorkOrder[];
  onNext: (workOrderId: string) => void;
}

export function WorkOrderSelection({
  workOrders,
  onNext,
}: WorkOrderSelectionProps) {
  const workOrderOptions: CardSelectionOption[] = workOrders.map(
    (workOrder) => ({
      id: workOrder.id,
      title: workOrder.displayId,
      description: `Frota - ${workOrder.fleetInfo.fleetNumber}`,
    })
  );

  const handleWorkOrderSelect = (workOrderId: string) => {
    onNext(workOrderId);
  };

  return (
    <CardSelectorDialog
      title="Escolha uma ordem de serviço"
      description="Vincule a inspeção a uma ordem de serviço"
      variant="list"
      options={workOrderOptions}
      value=""
      onChange={handleWorkOrderSelect}
      showFooter={false}
      dialogMode={false}
    />
  );
}
