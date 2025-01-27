import { useState, useEffect } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type {
  IChecklistItemTemplate,
  IChecklistItem,
} from "@/shared/types/checklist";
import { type IActiveTrailer } from "@/shared/types/trailer.interface";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BatchPartRequestDialog } from "@/app/part-request/components/create-batch-part-request/create-batch-part-request";
import { ServiceAssignmentCreationDialog } from "@/app/service-assigment/components/create-service-assignment-form";
import { useChecklistItems } from "../../checklist-item/hooks/use-checklist-items";
import { useToast } from "@/components/Toast/toast";
import { useChangeItemConformity } from "../../checklist-item/hooks/use-change-item-conformity";

type TChecklistItemProps = {
  categoryId: string;
  workOrderId: string;
  checklistId: string;
  templateItem: Pick<IChecklistItemTemplate, "id" | "description" | "weight">;
  trailers: IActiveTrailer[];
};

export default function ChecklistItem({
  categoryId,
  workOrderId,
  checklistId,
  templateItem,
  trailers,
}: TChecklistItemProps) {
  const { addToast: toast, ToastComponent } = useToast();
  categoryId
  const {
    updateItemConformity,
    updatedItem,
    updateSuccess,
    isLoading: isUpdating,
  } = useChangeItemConformity(checklistId, toast);

  const {
    data: checklistItemsData,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useChecklistItems(checklistId);

  const [localItems, setLocalItems] = useState<IChecklistItem[]>([]);

  useEffect(() => {
    if (checklistItemsData?.data) {
      setLocalItems(
        checklistItemsData.data.filter(
          (item) => item.itemTemplateId === templateItem.id
        )
      );
    }
  }, [checklistItemsData, templateItem.id]);

  useEffect(() => {
    if (updatedItem) {
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    }
  }, [updatedItem]);

  const handleConformityChange = (itemId: string, isConform: boolean) => {
    console.log("itemId", itemId);
    updateItemConformity(itemId, isConform);
  };

  const isAnyNonConform = localItems.some((item) => item.isConform === false);

  if (isItemsLoading) {
    return (
      <TableRow>
        <TableCell colSpan={trailers.length + 2}>
          <div className="flex justify-center items-center h-12">
            Carregando...
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (itemsError) {
    return (
      <TableRow>
        <TableCell colSpan={trailers.length + 2}>
          <div className="flex justify-center items-center h-12 text-red-500">
            Erro ao carregar itens do checklist
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={templateItem.id}>
      <TableCell>
        <div className="leading-none">
          <h3 className="font-medium">
            {templateItem.description || "Item não especificado"}
          </h3>
        </div>
      </TableCell>
      {trailers.map((trailer) => {
        const item = localItems.find((item) => item.trailerId === trailer.id);
        console.log("localItems", localItems);
        console.log("trailers", trailers);
        return (
          <TableCell key={trailer.id}>
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className={cn(
                        item?.isConform === false
                          ? "bg-red-600 bg-opacity-15"
                          : "bg-zinc-600/10",
                        "hover:bg-red-800 hover:bg-opacity-15"
                      )}
                      onClick={() =>
                        item && handleConformityChange(item.id, false)
                      }
                      disabled={isUpdating}
                    >
                      <X
                        className={cn(
                          "h-5 w-5",
                          item?.isConform === false
                            ? "text-red-600"
                            : "text-gray-400"
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Não conforme</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className={cn(
                        item?.isConform === true
                          ? "bg-green-600 bg-opacity-15"
                          : "bg-zinc-600/10",
                        "hover:bg-green-800 hover:bg-opacity-15"
                      )}
                      onClick={() =>
                        item && handleConformityChange(item.id, true)
                      }
                      disabled={isUpdating}
                    >
                      <Check
                        className={cn(
                          "h-5 w-5",
                          item?.isConform === true
                            ? "text-green-600"
                            : "text-gray-400"
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Conforme</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {updateSuccess === false && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Falha ao atualizar conformidade
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </TableCell>
        );
      })}
      <TableCell>
        {isAnyNonConform && (
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BatchPartRequestDialog
                    trailers={trailers}
                    workOrderId={workOrderId}
                    iconButton
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Solicitar Peça</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ServiceAssignmentCreationDialog
                    trailers={trailers}
                    workOrderId={workOrderId}
                    iconButton
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar Serviço</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <ToastComponent />
      </TableCell>
    </TableRow>
  );
}
