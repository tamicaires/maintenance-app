import type React from "react";
import { useState, useEffect } from "react";
import { CardHeader } from "@/components/card-header/card-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist";
import { useLoader } from "@/store/hook/use-loader";
import { Spinner } from "@/components/Spinner";
import EmptyState from "@/components/empty-state";
import { useChecklistWithRelationalData } from "../../checklist/hooks/use-checklist-with-relational-data";
import { ChecklistAccordionList } from "./checklist-accordion-list";
import { ChecklistQuickActions } from "../../checklist/components/checklist-quick-actions";

type ChecklistItemsProps = {
  checklistId: string;
  checklistData?: IChecklistWithRelationalData;
};

export default function ChecklistItems({
  checklistId,
  checklistData,
}: ChecklistItemsProps) {
  const [checklist, setChecklist] =
    useState<IChecklistWithRelationalData | null>(checklistData || null);

  const loader = useLoader();
  const { data, isLoading, isError, isSuccess } =
    useChecklistWithRelationalData(checklistId, {
      enabled: !checklistData,
    });

  if (isSuccess || isError) {
    loader.hide();
  }

  useEffect(() => {
    if (data?.data && !checklistData) {
      setChecklist(data.data);
    }
  }, [data, checklistData]);

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
}
