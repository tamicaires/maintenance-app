import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IChecklistTemplate } from "@/shared/types/checklist";
import { ChecklistTemplateHeader } from "@/components/checklist-template-header/checklist-template-header";

import { Separator } from "@/components/ui/separator";
import { ChecklistCategoriesList } from "./checklist-area-list";

interface ChecklistTemplateDetailsDialogProps {
  template: IChecklistTemplate;
}

export function ChecklistTemplateDetails({
  template,
}: ChecklistTemplateDetailsDialogProps) {
  return (
    <>
      <ChecklistTemplateHeader name={template.name} icon={template.icon} />
      <Separator className="my-4" />
      <ChecklistCategoriesList templateId={template.id} />
    </>
  );
}
