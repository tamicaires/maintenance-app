import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { MaintenanceStatus, SeverityLevel } from "@/shared/enums/work-order";
import { getMaintenanceStatusInfo, getSeverityInfo } from "@/utils/work-order";
import { GrFlagFill } from "react-icons/gr";
import { DropDownItemTable } from "../components/item-table-dropdown";

export const maintenanceColumns: ColumnDef<IWorkOrder>[] = [
  {
    accessorKey: "displayId",
    header: "ID da Ordem",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("displayId")}</div>
    ),
  },
  {
    accessorKey: "fleet.fleetNumber",
    header: "Número da Frota",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.fleet.fleetNumber}</div>
    ),
  },
  {
    accessorKey: "fleet.carrierName",
    header: "Transportadora",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.fleet.carrierName}
      </div>
    ),
  },
  {
    accessorKey: "severityLevel",
    header: "Nível de Severidade",
    cell: ({ row }) => {
      const severityValue = row.getValue("severityLevel") as SeverityLevel;
      const { color, label } = getSeverityInfo(severityValue);

      return (
        <div
          className={`text-muted-foreground rounded-full font-normal border-0 flex items-center justify-center gap-2`}
        >
          <GrFlagFill className={`text-${color}-600 w-2.5`} />
          {label}
        </div>
      );
    },
  },
  {
    accessorKey: "typeOfMaintenance",
    header: "Tipo de Manutenção",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("typeOfMaintenance")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status") as MaintenanceStatus;
      const { color, label } = getMaintenanceStatusInfo(statusValue);
      return (
        <div>
          <Badge
            className={`bg-${color}-50 text-${color}-600 hover:bg-${color}-100 rounded-full font-normal border-0`}
          >
            {label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Entrada",
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
    cell: ({ row }) => {
      return <DropDownItemTable workOrderId={row.original.id} />;
    },
  },
];
