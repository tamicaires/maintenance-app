import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IService } from "@/shared/types/service.interface";
import { ServiceCategory } from "@/shared/enums/service";

export const serviceColumns: ColumnDef<IService>[] = [
  {
    accessorKey: "serviceName",
    header: "Nome do Serviço",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("serviceName")}</div>
    ),
  },
  {
    accessorKey: "serviceCategory",
    header: "Categoria",
    cell: ({ row }) => {
      const categoryValue = row.getValue("serviceCategory") as ServiceCategory;
      return (
        <Badge
          className={`bg-primary/10 text-primary hover:bg-primary/15 rounded-full font-normal border-0`}
        >
          {categoryValue}
        </Badge>
      );
    },
  },
  {
    accessorKey: "weight",
    header: "Peso",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("weight")}</div>
    ),
  },
];
