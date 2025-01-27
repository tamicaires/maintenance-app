import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IChecklistTemplate } from "@/shared/types/checklist";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ChecklistTemplateCard } from "./checklist-template-card";

const TEMPLATES_PER_PAGE = 6;

interface ChecklistTemplateCardListProps {
  templates: IChecklistTemplate[];
  onSelect: (template: IChecklistTemplate) => void;
}

export function ChecklistTemplateCardList({
  templates,
  onSelect,
}: ChecklistTemplateCardListProps) {
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  const totalPages = Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE);
  const currentPageTemplates = filteredTemplates.slice(
    page * TEMPLATES_PER_PAGE,
    (page + 1) * TEMPLATES_PER_PAGE
  );

  const handlePreviousPage = () => setPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {currentPageTemplates.map((template) => (
          <ChecklistTemplateCard
            key={template.id}
            template={template}
            handleSelect={() => onSelect(template)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {currentPageTemplates.length} de {filteredTemplates.length}{" "}
          templates
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={page === index ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
