import { CardHeader } from "@/components/card-header/card-header";
import { useChecklistWithRelationalData } from "../../hooks/use-checklist-with-relational-data";
import { ChecklistAccordionList } from "../../../checklist-item/components/checklist-accordion-list";
import { ChecklistQuickActions } from "../checklist-quick-actions";
import { LoadingOverlay } from "@/components/loading-overlay";
import ErrorState from "@/components/states/error-state";

type ChecklistDetailsProps = {
  checklistId: string;
};

export default function ChecklistDetails({
  checklistId,
}: ChecklistDetailsProps) {
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
