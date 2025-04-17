import { useEffect, useMemo } from "react";
import { useChecklistStart } from "../hooks/use-checklist-start";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { getDataOrDefault } from "@/utils/data";
import { useWorkOrder } from "@/features/work-order/hooks/use-work-order";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { CardSelectionOption } from "@/components/card-selector/card-selector-dialog";
import { useChecklistTemplate } from "../../checklist-template/hooks/use-checklist-templates";
import { IChecklistTemplate } from "@/shared/types/checklist";
import { AnimatePresence } from "framer-motion";
import { MotionWrapper } from "@/components/motion-wrapper";
import { CardSelector } from "@/components/card-selector/card-selector";
import ChecklistItems from "../../checklist-item/components/checklist-items";
import { useDialog } from "@/context/dialog";
import { LoadingOverlay } from "@/components/loading-overlay";

type ChecklistDialogProps = {
  workOrderId?: string;
};

export function ChecklistStart({ workOrderId }: ChecklistDialogProps) {
  const { openDialog } = useDialog();
  const {
    isPending,
    currentStepName,
    handleTemplateSelect,
    handleWorkOrderSelect,
    startedChecklist,
  } = useChecklistStart({
    workOrderId,
  });

  useEffect(() => {
    if (startedChecklist) {
      openDialog({
        title: "Iniciar Checklist Items",
        content: <ChecklistItems checklistId={startedChecklist.id} />,
        size: "3xl",
      });
    }
  }, [startedChecklist]);

  const { data: workOrderData } = useWorkOrder({
    status: MaintenanceStatus.MANUTENCAO,
    perPage: "100",
  });

  console.log("currentStep", currentStepName);
  const workOrdersData: IWorkOrder[] = getDataOrDefault<IWorkOrder[]>(
    workOrderData,
    [],
    "workOrders"
  );
  const workOrderOptions: CardSelectionOption[] = workOrdersData.map(
    (workOrder) => ({
      id: workOrder.id,
      title: workOrder.displayId,
      description: `Frota - ${workOrder.fleet.fleetNumber}`,
    })
  );

  const { data: templateData } = useChecklistTemplate();
  const templates = getDataOrDefault<IChecklistTemplate[]>(
    templateData,
    [],
    "data"
  );
  const templatesOptions: CardSelectionOption[] = templates.map((template) => ({
    id: template.id,
    title: template.name,
    description: template.name,
    icon: template.icon,
  }));

  const selectorConfig = useMemo(
    () => ({
      template: {
        title: "Qual template você gostaria de usar?",
        description: "Escolha um template para iniciar uma nova inspeção",
        options: templatesOptions,
        onChange: handleTemplateSelect,
        variant: "grid",
        showFooter: false,
      },
      workOrder: {
        title: "Escolha uma ordem de serviço",
        description: "Vincule a inspeção a uma ordem de serviço",
        options: workOrderOptions,
        onChange: handleWorkOrderSelect,
        variant: "list",
        showFooter: false,
      },
    }),
    [templatesOptions, workOrderOptions]
  );

  const currentConfig =
    selectorConfig[currentStepName as keyof typeof selectorConfig];
  return (
    <AnimatePresence mode="wait">
      <MotionWrapper key={currentStepName}>
        <LoadingOverlay isLoading={isPending}>
          <CardSelector
            title={currentConfig.title}
            description={currentConfig.description}
            options={currentConfig.options}
            value=""
            onChange={currentConfig.onChange}
            showFooter={currentConfig.showFooter}
            variant={currentConfig.variant as any}
          />
        </LoadingOverlay>
      </MotionWrapper>
    </AnimatePresence>
  );
}
