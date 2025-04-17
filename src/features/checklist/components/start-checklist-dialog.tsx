import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useChecklistTemplate } from "../checklist-template/hooks/use-checklist-templates";
import ChecklistItems from "./checklist-items";
import { ChecklistSummary } from "../checklist/components/checklist-summary";
import {
  type IWorkOrderFilters,
  useWorkOrder,
} from "@/features/work-order/hooks/use-work-order";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { getDataOrDefault } from "@/utils/data";
import { useToast } from "@/components/Toast/toast";
import { useStartChecklist } from "../checklist/hooks/use-start-checklist";
import { TemplateSelection } from "../checklist-template/components/template-selection";
import type { IWorkOrder } from "@/shared/types/work-order.interface";
import type { IChecklistTemplate } from "@/shared/types/checklist";
// import { WorkOrderSelection } from "@/features/work-order/components/work-order-selection/work-order-selection";
import { RootLoader } from "@/components/loader";

export type ChecklistStepType =
  | "template"
  | "workOrder"
  | "items"
  | "loading"
  | "summary";

export interface IItemStatus {
  [itemId: string]: {
    [trailerId: string]: boolean;
  };
}

export interface IChecklistDialogProps {
  trigger: React.ReactNode;
  workOrderId?: string;
}

export function StartChecklistDialog({
  trigger,
  workOrderId: initialWorkOrderId,
}: IChecklistDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ChecklistStepType>("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [workOrderId, setWorkOrderId] = useState<string>(
    initialWorkOrderId || ""
  );
  console.log(open, workOrderId);
  const [itemStatuses, setItemStatuses] = useState<IItemStatus>({});

  const { toast: toast, ToastComponent } = useToast();

  const handleCloseDialog = () => {
    setOpen(false);
    setStep("template");
  };

  const {
    startChecklistForm,
    handleSubmit,
    startedChecklist,
    isStartChecklistLoading,
    isCreateBatchLoading,
    isStartChecklistOpen,
    setIsStartChecklistOpen,
    reset,
    isStartChecklistSuccess,
    isCreateBatchSuccess,
  } = useStartChecklist(toast, handleCloseDialog);

  const filters: IWorkOrderFilters = {
    status: MaintenanceStatus.MANUTENCAO,
  };

  const isStartChecklistFlowLoading =
    isStartChecklistLoading || isCreateBatchLoading;

  const { data: workOrderData } = useWorkOrder(filters);
  const workOrders = getDataOrDefault<IWorkOrder[]>(
    workOrderData?.workOrders,
    []
  );

  const { data: templateData } = useChecklistTemplate();
  const templates = getDataOrDefault<IChecklistTemplate[]>(
    templateData,
    [],
    "data"
  );

  useEffect(() => {
    if (isStartChecklistSuccess && isCreateBatchSuccess && startedChecklist) {
      setStep("items");
    }
  }, [isCreateBatchSuccess, startedChecklist]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    // setTemplateDialogOpen(false);
    if (initialWorkOrderId) {
      startChecklistForm.setValue("templateId", templateId);
      startChecklistForm.setValue("workOrderId", initialWorkOrderId);
      handleSubmit();
    } else {
      setStep("workOrder");
      // setWorkOrderDialogOpen(true);
    }
  };

  const handleWorkOrderSelect = (selectedWorkOrderId: string) => {
    setWorkOrderId(selectedWorkOrderId);
    // setWorkOrderDialogOpen(false);
    startChecklistForm.setValue("templateId", selectedTemplateId);
    startChecklistForm.setValue("workOrderId", selectedWorkOrderId);
    handleSubmit();
  };

  // const handleItemStatusChange = (
  //   itemId: string,
  //   trailerId: string,
  //   isConform: boolean
  // ) => {
  //   setItemStatuses((prev) => ({
  //     ...prev,
  //     [itemId]: { ...prev[itemId], [trailerId]: isConform },
  //   }));
  // };

  const handleClose = () => {
    setOpen(false);
    setStep("template");
    setSelectedTemplateId("");
    setWorkOrderId("");
    setItemStatuses({});
    // setTemplateDialogOpen(false);
    // setWorkOrderDialogOpen(false);
    reset();
  };

  const renderStep = () => {
    switch (step) {
      case "template":
        return (
          <TemplateSelection
            templates={templates}
            onNext={handleTemplateSelect}
          />
        );
      case "workOrder":
        return (
          // <WorkOrderSelection
          //   workOrders={workOrders}
          //   onNext={handleWorkOrderSelect}
          // />
          "oiii "
        );
      case "loading":
        return (
          isStartChecklistFlowLoading && (
            <div className="h-[350px] flex justify-center">
              <RootLoader />
            </div>
          )
        );
      case "items":
        return startedChecklist ? (
          <div className="flex flex-col">
            <ChecklistItems
              checklistId={startedChecklist.id}
              isDialogMode={false}
            />
          </div>
        ) : null;
      case "summary":
        return !isStartChecklistLoading && startedChecklist ? (
          <ChecklistSummary
            itemStatuses={itemStatuses}
            templateId={startedChecklist.templateId}
            workOrderId={startedChecklist.workOrderId}
            onClose={handleClose}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isStartChecklistOpen} onOpenChange={setIsStartChecklistOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[850px] max-h-[90vh] flex flex-col bg-card">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle hidden>Iniciar Checklist</DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <MotionWrapper key={step}>{renderStep()}</MotionWrapper>
        </AnimatePresence>
        <ToastComponent />
        {isStartChecklistLoading && <RootLoader />}
      </DialogContent>
    </Dialog>
  );
}

const MotionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex-grow overflow-hidden"
  >
    {children}
  </motion.div>
);
