import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ServiceCategory } from "@/shared/enums/service";
import { TServiceAssigmentStatus } from "@/shared/enums/service-assigment";

export type IServiceAssignmentCollumsData = {
  serviceName: string;
  serviceCategory: ServiceCategory;
  trailerPlate: string;
  status: TServiceAssigmentStatus;
  startAt: string;
  endAt: string;
};

export const serviceAssignmentColumns: ColumnDef<IServiceAssignmentCollumsData>[] =
  [
    {
      accessorKey: "serviceName",
      header: "Serviço",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("serviceName")}</div>
      ),
    },
    {
      accessorKey: "serviceCategory",
      header: "Categoria",
      cell: ({ row }) => (
        <div className="text-muted-foreground capitalize">
          {row.getValue("serviceCategory")}
        </div>
      ),
    },
    {
      accessorKey: "trailerPlate",
      header: "Carreta",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue("trailerPlate")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal capitalize">
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "startAt",
      header: "Início",
      cell: ({ row }) => {
        return (
          <div className="text-muted-foreground">
            {/* {date ? format(new Date(date), "dd/MM HH:mm", { locale: ptBR }) : "—"} */}
            {row.getValue("startAt")}
          </div>
        );
      },
    },
    {
      accessorKey: "endAt",
      header: "Término",
      cell: ({ row }) => {
        // const date = row.getValue("endAt");
        return (
          <div className="text-muted-foreground">
            {/* {date ? format(new Date(date), "dd/MM HH:mm", { locale: ptBR }) : "—"} */}
            {row.getValue("endAt")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Eye className="h-4 w-4 mr-2" />
          Detalhes
        </Button>
      ),
    },
  ];
