import { IPartRequest } from "@/shared/types/part-request";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleX, Eye, MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/shared/enums/part-request";
import { getRequestStatusInfo } from "@/utils/part-request";
import { PartRequestCard } from "../part-request-card/part-request-card";

type IPartRequestItemProps = {
  partRequest: IPartRequest;
};

export default function PartRequestItem({
  partRequest,
}: IPartRequestItemProps) {
  const statusInfo = getRequestStatusInfo(partRequest.status);

  const isStatusClosed =
    partRequest.status === RequestStatus.DELIVERED ||
    partRequest.status === RequestStatus.REJECTED;

  return (
    <TableRow key={partRequest.id}>
      <TableCell>
        <div className="leading-none">
          <h3 className="font-medium">
            {partRequest.part?.name || "Peça não especificada"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {`NI: ${partRequest.part?.partNumber}` || "Número não disponível"}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-center">
          <Badge className="bg-blue-500 bg-opacity-20 text-blue-500 hover:bg-blue-700 hover:bg-opacity-20 rounded-sm">
            {`${partRequest.trailer.plate}`}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {partRequest.quantity} / {partRequest.approvedQuantity || "-"}
      </TableCell>
      <TableCell className="text-center">
        <Badge
          className={`text-${statusInfo.color}-600 bg-${statusInfo.color}-500 bg-opacity-10 hover:bg-${statusInfo.color}-700 hover:bg-opacity-20 text-xs`}
        >
          {statusInfo.label}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-full hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <PartRequestCard partRequest={partRequest}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <div className="flex gap-1.5 items-center hover:text-primary">
                  <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  Ver detalhes
                </div>
              </DropdownMenuItem>
            </PartRequestCard>
            {!isStatusClosed && (
              <DropdownMenuItem className="text-red-600">
                <div className="flex gap-1.5 items-center">
                  <CircleX className="h-4 w-4 text-red-600" />
                  Cancelar Solicitação
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
