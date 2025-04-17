import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ITrailer } from "@/shared/types/trailer.interface";
import { TrailerDropDown } from "../components/trailer-dropdown-menu/trailer-dropdown-menu";

export const trailerColumns: ColumnDef<ITrailer>[] = [
  {
    accessorKey: "plate",
    header: "Placa",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("plate")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Posição",
    cell: ({ row }) => {
      const position = row.getValue("position") as number | null;
      return <div className="text-muted-foreground">{position ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "fleet",
    header: "Frota",
    cell: ({ row }) => {
      const fleet = row.original.fleet;
      return (
        <div className="font-medium">
          {fleet ? `${fleet.fleetNumber}` : "Sem frota"}
        </div>
      );
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
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-muted-foreground">
          {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4 w-14">
          <TrailerDropDown trailer={row.original} onDelete={() => {}} />
        </div>
      );
    },
  },
];
