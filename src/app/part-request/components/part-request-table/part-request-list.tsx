import { IPartRequest } from "@/shared/types/part-request";
import PartRequestItem from "./part-request-item";
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

interface IPartRequestListProps {
  partRequests: IPartRequest[];
}

export default function PartRequestList({
  partRequests,
}: IPartRequestListProps) {
  return (
    <div className="space-y-1">
      <ScrollArea>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Peça</TableHead>
                <TableHead className="text-center">Reboque</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Quantidade
                </TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Status
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partRequests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground h-[200px]"
                  >
                    <EmptyState message="Nenhum pedido de peça encontrado" />
                  </TableCell>
                </TableRow>
              ) : (
                partRequests.map((partRequest) => (
                  <PartRequestItem
                    key={partRequest.id}
                    partRequest={partRequest}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
