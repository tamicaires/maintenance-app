import { useState } from "react";
import { ChevronDown, Trash2, Edit2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddChecklistTemplateItemForm } from "./add-template-item-form";
import {
  IChecklistCategory,
  IChecklistItemTemplate,
} from "@/shared/types/checklist";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/empty-state";

interface ChecklistCategoryProps {
  category: IChecklistCategory;
  onDeleteItem: (categoryId: string, itemId: string) => void;
}

export function ChecklistCategory({
  category,
  onDeleteItem,
}: ChecklistCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState("");

  const categoryItems = category.items || [];
  const canAddItem = true;
  const hasItems = categoryItems.length > 0;

  const handleEditClick = (item: IChecklistItemTemplate) => {
    setEditingItemId(item.id);
    setEditedDescription(item.description);
  };

  const handleSaveEdit = (itemId: string) => {
    itemId
    setEditingItemId(null);
  };

  return (
    <div className="rounded-lg border border-muted-foreground/20 bg-card shadow-sm w-full transition-all duration-200 hover:shadow-md">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors duration-200 hover:bg-muted"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 w-full">
          <ChevronDown
            className={cn("h-5 w-5 transition-transform text-gray-500", {
              "transform rotate-180": !isExpanded,
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
              {canAddItem && (
                <AddChecklistTemplateItemForm
                  isOpen={isAddingItem}
                  onOpenChange={setIsAddingItem}
                  templateId={category.templateId}
                  templateCategoryId={category.id}
                />
              )}
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
                <div>
                  {categoryItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 group transition-all duration-200",
                        index !== categoryItems.length - 1 &&
                          "border-b border-muted"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {editingItemId === item.id ? (
                          <Input
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                            className="flex-1"
                            autoFocus
                          />
                        ) : (
                          <span className="flex-1 text-[0.95rem] text-accent-foreground">
                            {item.description}
                          </span>
                        )}
                        {item.weight > 0 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-orange-500 bg-opacity-15 text-orange-500 font-medium px-2 py-1"
                          >
                            Peso {item.weight}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {editingItemId === item.id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEdit(item.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(item)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteItem(category.id, item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
