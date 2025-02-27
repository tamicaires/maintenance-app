import { WorkOrderDetails } from "@/app/work-order/components/work-order-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBoxWithRelationalData } from "@/shared/types/box";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";

export const boxesColumns: ColumnDef<IBoxWithRelationalData>[] = [
  {
    accessorKey: "name",
    header: "Box",
    cell: ({ row }) => (
      <div className="text-muted-foreground w-1">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "workOrder.fleet.fleetNumber",
    header: "Frota",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.workOrder?.fleet.fleetNumber || "N/A"}</div>
    ),
  },
  {
    accessorKey: "workOrder.entryMaintenance",
    header: "Entrada",
    cell: ({ row }) => {
      const entryDate = row.original.workOrder?.entryMaintenance;
      return (
        <div className="text-muted-foreground">
          {entryDate
            ? format(new Date(entryDate), "dd/MM HH:mm", { locale: ptBR })
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progresso",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-normal">
        {row.getValue("progress")}%
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <WorkOrderDetails
        workOrderId={row.original.workOrder?.id}
        trigger={
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Eye className="h-4 w-4 mr-2" />
            Detalhes
          </Button>
        }
      />
    ),
  },
];
