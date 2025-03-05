import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IEmployee } from "@/shared/types/employee.interface";

export const employeeColumns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "workShift",
    header: "Turno",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("workShift")}</div>
    ),
  },
  {
    accessorKey: "jobTitle",
    header: "Cargo",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("jobTitle")}</div>
    ),
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
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("createdAt")}</div>
    ),
  },
];
