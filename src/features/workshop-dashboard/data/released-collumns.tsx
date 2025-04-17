import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DailyData } from "../pages";

export const releasedColumns: ColumnDef<DailyData>[] = [
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
    accessorKey: "expectedCompletionTime",
    header: "Tempo Estimado",
    cell: ({ row }) => {
      const time = row.getValue("expectedCompletionTime") as string;
      return <div className="text-muted-foreground">{time}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="text-muted-foreground">
          {new Date(date).toLocaleDateString()}
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
