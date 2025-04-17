import { ScrollArea } from "@/components/ui/scroll-area";
import { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist";
import { ChecklistAccordionItem } from "../../components/checklist-accordion";

type ChecklistAccordionListProps = {
  checklist: IChecklistWithRelationalData;
};

export function ChecklistAccordionList({
  checklist,
}: ChecklistAccordionListProps) {
  return (
    <ScrollArea>
      <div className="h-[45vh]">
        {checklist.template.templateCategories.map((category) => (
          <ChecklistAccordionItem
            key={category.id}
            workOrderId={checklist.workOrder.id}
            checklistId={checklist.id}
            trailers={checklist.workOrder.fleet.trailers}
            category={category}
            onDeleteItem={() => {}}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
