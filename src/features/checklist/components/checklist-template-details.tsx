import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IChecklistTemplate } from "@/shared/types/checklist";
import { ChecklistTemplateHeader } from "@/components/checklist-template-header/checklist-template-header";
import { ChecklistCategoriesList } from "../checklist-template/components/checklist-area-list";
import { Separator } from "@/components/ui/separator";

interface ChecklistTemplateDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: IChecklistTemplate;
}

export function ChecklistTemplateDetailsDialog({
  isOpen,
  onClose,
  template,
}: ChecklistTemplateDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:min-w-[700px] h-full max-h-[calc(85vh-80px)] bg-card">
        <DialogHeader>
          <DialogTitle hidden>Detalhes do Template de Checklist</DialogTitle>
          <ChecklistTemplateHeader name={template.name} icon={template.icon} />
          <Separator className="my-4" />
          <ChecklistCategoriesList templateId={template.id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
