import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/empty-state";
import {
  IChecklistItemTemplate,
} from "@/shared/types/checklist";
import ChecklistItem from "./checklist-item";
import { IActiveTrailer } from "@/shared/types/trailer.interface";

interface IChecklistItemsListProps {
  checklistId: string;
  categoryId: string;
  workOrderId: string;
  templateItems: Pick<
    IChecklistItemTemplate,
    "id" | "description" | "weight"
  >[];
  trailers: IActiveTrailer[];
}

export default function ChecklistItemsList({
  checklistId,
  categoryId,
  workOrderId,
  templateItems,
  trailers,
}: IChecklistItemsListProps) {
  const hasItems = templateItems.length > 0;
  return (
    <div className="space-y-1">
      <ScrollArea>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                {trailers.map((trailer) => (
                  <TableHead key={trailer.id} className="text-center">
                    SR{trailer.position}
                  </TableHead>
                ))}
                <TableHead className="w-[50px] text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasItems ? (
                templateItems.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    checklistId={checklistId}
                    categoryId={categoryId}
                    workOrderId={workOrderId}
                    templateItem={item}
                    trailers={trailers}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground h-[200px]"
                  >
                    <EmptyState message="Nenhum pedido de peça encontrado" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
