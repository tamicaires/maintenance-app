import {
  CardSelectionOption,
  CardSelectorDialog,
} from "@/components/card-selector/card-selector";
import { IChecklistTemplate } from "@/shared/types/checklist";

export interface TemplateSelectionProps {
  templates: IChecklistTemplate[];
  onNext: (templateId: string) => void;
}

export function TemplateSelection({
  templates,
  onNext,
}: TemplateSelectionProps) {
  const templatesOptions: CardSelectionOption[] = templates.map((template) => ({
    id: template.id,
    title: template.name,
    description: template.name,
    icon: template.icon,
  }));

  const handleTemplateSelect = (templateId: string) => {
    onNext(templateId);
  };

  return (
    <CardSelectorDialog
      title="Qual template você gostaria de usar?"
      description="Escolha um template para iniciar uma nova inspeção"
      options={templatesOptions}
      value=""
      onChange={handleTemplateSelect}
      showFooter={false}
      dialogMode={false}
    />
  );
}
