import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/empty-state";
import ChecklistItemsList from "../checklist/components/checklist-items-list";
import { IChecklistTemplateCategoryWithRelationalData } from "@/shared/types/checklist/template-category";
import { IActiveTrailer } from "@/shared/types/trailer.interface";

interface ChecklistAccordionProps {
  checklistId: string;
  category: IChecklistTemplateCategoryWithRelationalData;
  trailers: IActiveTrailer[];
  workOrderId: string;
  onDeleteItem: (categoryId: string, itemId: string) => void;
}

export function ChecklistAccordionItem({
  checklistId,
  category,
  workOrderId,
  trailers,
}: ChecklistAccordionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categoryItems = category.templateItems || [];
  const hasItems = categoryItems.length > 0;

  return (
    <div className="my-3 rounded-lg border border-muted-foreground/20 bg-card shadow-sm w-full transition-all duration-200 hover:shadow-md hover:border hover:border-primary/50">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors duration-200 hover:bg-accent/40"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 w-full">
          <ChevronDown
            className={cn("h-5 w-5 transition-transform text-gray-500 ", {
              "transform rotate-180": isExpanded,
            })}
          />
          <div className="flex justify-between w-full items-center">
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-blue-500 bg-opacity-15 text-blue-500 font-medium px-2 py-1"
              >
                {categoryItems.length || 0} items
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Separator className="space-y-4" />
            <div className="p-4 pt-0 space-y-1">
              {hasItems ? (
                <ChecklistItemsList
                  checklistId={checklistId}
                  categoryId={category.id}
                  workOrderId={workOrderId}
                  templateItems={categoryItems}
                  trailers={trailers}
                />
              ) : (
                <EmptyState
                  message="Nenhum item cadastrado"
                  description="Checklist template não possui nenhum item cadastrado."
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
