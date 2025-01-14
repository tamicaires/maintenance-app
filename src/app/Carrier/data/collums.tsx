import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ICarrier } from "@/shared/types/carrier";

export const carrierColumns: ColumnDef<ICarrier>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "carrierName",
    header: "Transportadora",
    cell: ({ row }) => (
      <div className="max-w-[500px] font-medium">
        {row.getValue("carrierName")}
      </div>
    ),
  },
  {
    accessorKey: "managerName",
    header: "Gerente",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("managerName")}</div>
    ),
  },
  {
    accessorKey: "managerPhone",
    header: "Telefone",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("managerPhone")}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          className={`${
            isActive
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          } rounded-full font-normal border-0`}
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
