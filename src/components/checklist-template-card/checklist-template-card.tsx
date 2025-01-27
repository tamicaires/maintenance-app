import { IChecklistTemplate } from "@/shared/types/checklist";
import { DynamicIcon } from "../ui/dynamic-icon";
import { cn } from "@/lib/utils";

type ChecklistTemplateCardProps = {
  template: IChecklistTemplate;
  handleSelect: VoidFunction;
};

export function ChecklistTemplateCard({
  template,
  handleSelect,
}: ChecklistTemplateCardProps) {
  return (
    <div
      onClick={handleSelect}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all py-12 shadow-lg border-accent",
        "border-transparent hover:border-primary/50 hover:shadow-lg "
      )}
    >
      <div className={cn("p-4 rounded-lg")}>
        <DynamicIcon
          iconName={template.icon}
          className="w-14 h-14 text-primary"
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold">{template.name}</h3>
        <p className="text-sm text-muted-foreground">
          {template.items.length} items
        </p>
      </div>
    </div>
  );
}
