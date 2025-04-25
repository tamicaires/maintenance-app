import { useState } from "react";
import { ChecklistCategory } from "./checklist-category";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChecklistCategory } from "../../hooks/use-checklist-category";
import EmptyState from "@/components/states/empty-state";
import { AddTemplateCategory } from "../../components/add-template-category";
import { Spinner } from "@/components/Spinner";

type ChecklistAreaListProps = {
  templateId: string;
};

export function ChecklistCategoriesList({
  templateId,
}: ChecklistAreaListProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const { data, isLoading: isChecklistCategoryLoading } =
    useChecklistCategory(templateId);

  const categories = data?.data || [];

  const hasCategories = categories.length > 0;

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Detalhes</h2>
        <AddTemplateCategory
          isOpen={isAddingCategory}
          onOpenChange={setIsAddingCategory}
          templateId={templateId}
        />
      </div>
      <ScrollArea className="h-[calc(75vh-200px)]">
        {isChecklistCategoryLoading && <Spinner />}
        <div className="space-y-4">
          {hasCategories ? (
            categories.map((category) => (
              <ChecklistCategory
                key={category.id}
                category={category}
                onDeleteItem={() => {}}
              />
            ))
          ) : (
            <EmptyState
              message="Nenhuma categoria cadastrada"
              description="Crie uma nova categoria para adicionar itens ao checklist."
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
