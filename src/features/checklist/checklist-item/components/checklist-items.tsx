import { CardHeader } from "@/components/card-header/card-header";
import { useChecklistWithRelationalData } from "../../checklist/hooks/use-checklist-with-relational-data";
import { ChecklistAccordionList } from "./checklist-accordion-list";
import { ChecklistQuickActions } from "../../checklist/components/checklist-quick-actions";
import { LoadingOverlay } from "@/components/loading-overlay";
import ErrorState from "@/components/states/error-state";

type ChecklistItemsProps = {
  checklistId: string;
};

export default function ChecklistItems({ checklistId }: ChecklistItemsProps) {
  const { data: checklist, isLoading } =
    useChecklistWithRelationalData(checklistId);

  return (
    <>
      <LoadingOverlay isLoading={isLoading}>
        {checklist ? (
          <div className="p-6">
            <CardHeader
              variant="compact"
              title={checklist.template.name || "Checklist"}
              description="Checklist em andamento"
              lastUpdate={checklist.updatedAt}
              workOrder={checklist.workOrder}
            />
            <ChecklistAccordionList checklist={checklist} />
            <ChecklistQuickActions lastUpdate={checklist.updatedAt} />
          </div>
        ) : (
          <ErrorState message="Checklist não encontrado" />
        )}
      </LoadingOverlay>
    </>
  );
}
