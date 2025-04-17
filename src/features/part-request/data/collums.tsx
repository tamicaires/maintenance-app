import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/shared/enums/part-request";
import { IPartRequestRelationalData } from "@/shared/types/part-request-relational-data";
import { dateUtil } from "@/utils/date";

export interface IPartRequestTableProps {
  partRequest: IPartRequestRelationalData;
}

export const partRequestColumns: ColumnDef<IPartRequestRelationalData>[] = [
  {
    id: "part",
    accessorKey: "part",
    header: "Peça",
    cell: ({ row }) => (
      <div>
        <span className="max-w-[500px] font-medium">
          {row.original.part.name}
        </span>
        <p className="text-sm text-muted-foreground">
          NI: {row.original.part?.partNumber}
        </p>
      </div>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as RequestStatus;
      return (
        <Badge
          className={`${
            status === RequestStatus.APPROVED
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
          } rounded-full font-normal border-0`}
        >
          {status === RequestStatus.APPROVED ? "Aprovado" : "Pendente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "requestedBy",
    header: "Solicitante",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.requestedBy?.name}
      </div>
    ),
  },
  {
    accessorKey: "requestedAt",
    header: "Data de Solicitação",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-center">
        {dateUtil.formatDateBR(new Date(row.original.requestedAt))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            className="text-primary p-0 h-auto font-medium"
          >
            Ações
          </Button>
        </div>
      );
    },
  },
];
