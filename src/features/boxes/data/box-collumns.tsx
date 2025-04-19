import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IBox } from "@/shared/types/box";

export const boxColumns: ColumnDef<IBox>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return (
        <div className="text-muted-foreground">
          {description || "Sem descrição"}
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Posição",
    cell: ({ row }) => {
      const position = row.getValue("position") as number;
      return <div className="text-muted-foreground">{position || "N/I"}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          className={
            isActive
              ? "bg-green-500/10 text-green-600 hover:bg-green-500/15 rounded-full border-0"
              : "bg-red-500/10 text-red-600 hover:bg-red-500/15 rounded-full border-0"
          }
        >
          {isActive ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4 w-14">
          {/* <BoxActions box={row.original} /> */}
        </div>
      );
    },
  },
];
