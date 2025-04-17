import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { IChecklistTemplateItem } from "@/shared/types/checklist/checklist-template-item";
import { useChecklistTemplate } from "../../checklist-template/hooks/use-checklist-templates";

type Trailer = "Trailer 1" | "Trailer 2" | "Trailer 3";

interface ChecklistSummaryProps {
  itemStatuses: Record<string, Partial<Record<Trailer, boolean>>>;
  templateId: string;
  workOrderId: string;
  onClose: () => void;
  showBackToOrder?: boolean;
}

export function ChecklistSummary({
  itemStatuses,
  templateId,
  workOrderId,
  onClose,
  showBackToOrder,
}: ChecklistSummaryProps) {
  const { data } = useChecklistTemplate();
  const [nonConformingItems, setNonConformingItems] = useState<
    Array<{ item: IChecklistTemplateItem; trailers: Trailer[] }>
  >([]);

  const templateData = data?.data || [];
  const template = templateData.find((t) => t.id === templateId);

  const items = template?.items || [];

  useEffect(() => {
    const nonConforming = items.reduce((acc, item) => {
      const nonConformingTrailers = (
        Object.entries(itemStatuses[item.id] || {}) as [
          Trailer,
          boolean | undefined
        ][]
      )
        .filter(([_, isConform]) => isConform === false)
        .map(([trailer]) => trailer);

      if (nonConformingTrailers.length > 0) {
        acc.push({ item, trailers: nonConformingTrailers });
      }
      return acc;
    }, [] as Array<{ item: IChecklistTemplateItem; trailers: Trailer[] }>);

    setNonConformingItems(nonConforming);
  }, [items, itemStatuses]);

  const totalItems = items.length * 3; // 3 trailers per item
  const conformingItems = Object.values(itemStatuses).reduce(
    (acc, trailerStatuses) =>
      acc + Object.values(trailerStatuses).filter(Boolean).length,
    0
  );
  const conformPercentage = (conformingItems / totalItems) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Resumo do Checklist</h2>
        <p className="text-muted-foreground">Ordem de Serviço: {workOrderId}</p>
      </div>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-3xl font-bold text-green-500">{conformingItems}</p>
          <p className="text-sm text-muted-foreground">Itens Conformes</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-red-500">
            {totalItems - conformingItems}
          </p>
          <p className="text-sm text-muted-foreground">Itens Não Conformes</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{conformPercentage.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">Conformidade</p>
        </div>
      </div>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <h3 className="font-semibold mb-2">Itens Não Conformes</h3>
        {nonConformingItems.map(({ item, trailers }) => (
          <motion.div
            key={item.id}
            className="bg-red-100 p-4 rounded-lg mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="font-semibold">{item.description}</h4>
            <p className="text-sm text-muted-foreground">
              Não conforme em: {trailers.join(", ")}
            </p>
          </motion.div>
        ))}
      </ScrollArea>
      <Button className="w-full" onClick={onClose}>
        Fechar e Iniciar Novo Checklist
      </Button>
    </div>
  );
}
