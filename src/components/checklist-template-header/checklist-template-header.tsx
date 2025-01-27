import { DynamicIcon } from "../ui/dynamic-icon";
import { DialogDescription, DialogTitle } from "../ui/dialog";

interface ChecklistTemplateHeaderProps {
  name: string;
  icon?: string;
}
export function ChecklistTemplateHeader({
  name,
  icon: templateIcon,
}: ChecklistTemplateHeaderProps) {
  return (
    <div className="flex gap-2 items-center space-x-2">
      <div className="p-3 bg-primary/10 rounded-full">
        <DynamicIcon iconName={templateIcon} className="w-6 h-6 text-primary" />
      </div>
      <div>
        <DialogTitle className="text-xl font-semibold">{name}</DialogTitle>
        <DialogDescription>
          Adicione itens ao seu template de checklist
        </DialogDescription>
      </div>
    </div>
  );
}
