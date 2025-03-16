import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IVehicle } from "../type/vehicles";
import VehicleCard from "../components/vehicle-card";


export const vehicleColumns: ColumnDef<IVehicle>[] = [
  {
    accessorKey: "plate",
    header: "Placa",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("plate")}</div>
    ),
  },
  {
    accessorKey: "model",
    header: "Modelo",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("model")}</div>
    ),
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("brand")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Ano",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("year")}</div>
    ),
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("color") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "km",
    header: "Quilometragem",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("km")} km</div>
    ),
  },
  {
    accessorKey: "power",
    header: "Potência",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("power")} cv</div>
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
    accessorKey: "fleet",
    header: "Frota",
    cell: ({ row }) => {
      const fleet = row.getValue("fleet") as IVehicle["fleet"];
      return (
        <div className="text-muted-foreground">
          {fleet ? `Frota ${fleet.fleetNumber}` : "Sem frota"}
        </div>
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
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4 w-14">
          <VehicleCard vehicle={row.original} />
        </div>
      );
    },
  },
];
