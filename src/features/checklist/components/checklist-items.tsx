import type React from "react";
import { useState, useEffect } from "react";
import { CardHeader } from "@/components/card-header/card-header";
import { ChecklistQuickActions } from "../checklist/components/checklist-quick-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChecklistWithRelationalData } from "../checklist/hooks/use-checklist-with-relational-data";
import type { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist";
import { ChecklistAccordionList } from "../checklist-item/components/checklist-accordion-list";
import { useLoader } from "@/store/hook/use-loader";
import { RootLoader } from "@/components/loader";
import { Spinner } from "@/components/Spinner";
import EmptyState from "@/components/empty-state";

type ChecklistItemsProps = {
  checklistId: string;
  isDialogMode?: boolean;
  trigger?: React.ReactNode;
  checklistData?: IChecklistWithRelationalData;
};

export default function ChecklistItems({
  checklistId,
  isDialogMode = true,
  trigger,
  checklistData,
}: ChecklistItemsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checklist, setChecklist] =
    useState<IChecklistWithRelationalData | null>(checklistData || null);

  const loader = useLoader();
  const { data, isLoading, isError, isSuccess } =
    useChecklistWithRelationalData(checklistId, {
      enabled: isOpen && !checklistData,
    });

  if (isSuccess || isError) {
    loader.hide();
  }

  useEffect(() => {
    if (data?.data && !checklistData) {
      setChecklist(data.data);
    }
  }, [data, checklistData]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!checklist) {
      return <EmptyState message="Checklist não encontrado" />;
    }

    return (
      <>
        <CardHeader
          variant="compact"
          title={checklist.template.name || "Checklist"}
          description="Checklist em andamento"
          lastUpdate={checklist.updatedAt}
          workOrder={checklist.workOrder}
        />
        <ChecklistAccordionList checklist={checklist} />
        <ChecklistQuickActions lastUpdate={checklist.updatedAt} />
      </>
    );
  };

  if (!isDialogMode) {
    return <div className="h-[90vh]">{renderContent()}</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[850px] min-h-[250px] h-[90vh] flex flex-col bg-card">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle hidden>Iniciar Checklist</DialogTitle>
        </DialogHeader>
        <div>{renderContent()}</div>
      </DialogContent>
      <RootLoader />
    </Dialog>
  );
}
