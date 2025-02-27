import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DailyData } from "../pages";
import { dateUtil } from "@/utils/date";

export const queueColumns: ColumnDef<DailyData>[] = [
  {
    accessorKey: "displayId",
    header: "ID",
    cell: ({ row }) => {
      const time = row.getValue("displayId") as string;
      return <div className="text-muted-foreground">{time}</div>;
    },
  },
  {
    accessorKey: "fleetNumber",
    header: "Número da Frota",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("fleetNumber")}</div>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={`${
            status === "Em Fila"
              ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
              : status === "Em Manutenção"
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "bg-green-50 text-green-600 hover:bg-green-100"
          } rounded-full font-normal border-0`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "typeOfMaintenance",
    header: "Plano de Manutenção",
    cell: ({ row }) => {
      const time = row.getValue("typeOfMaintenance") as string;
      return <div className="text-muted-foreground">{time}</div>;
    },
  },
  {
    accessorKey: "severityLevel",
    header: "Nível de Severidade",
    cell: ({ row }) => {
      const time = row.getValue("severityLevel") as string;
      return <div className="text-muted-foreground">{time}</div>;
    },
  },
  {
    accessorKey: "entryQueue",
    header: "Entrada na Fila",
    cell: ({ row }) => {
      const time = row.getValue("entryQueue") as string;
      return (
        <div className="text-muted-foreground">
          {dateUtil.formatDateBR(new Date(time))}
        </div>
      );
    },
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
