import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getDataOrDefault } from "@/utils/data";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { ReportTable } from "@/components/data-table/data-table";
import { IVehicleFilters } from "../type/vehicle-hook";
import { useVehicles } from "../hooks/use-vehicle";
import { IVehicle, IVehicleWithCount } from "../type/vehicles";
import { vehicleColumns } from "../data/collumns";
import VehicleCreationDialog from "../components/create-vehicle";

export function Vehicle() {
  const [filters, setFilters] = useState<IVehicleFilters>({});

  const { data, error, isLoading: isVehiclesLoading } = useVehicles(filters);
  const vehiclesData: IVehicleWithCount = useMemo(
    () => ({
      vehicles: getDataOrDefault<IVehicle[]>(data, [], "vehicles"),
      totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
    }),
    [data]
  );

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const handlePaginationChange = useCallback(
    (page: number, perPage: number) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: page.toString(),
        perPage: perPage.toString(),
      }));
    },

    []
  );

  return (
    <ReportContainer>
      <ReportHeader
        title="Veículos"
        description="Gerencie os veículos e suas informações"
      >
        <Button variant="secondary">Exportar Relatório</Button>
        <VehicleCreationDialog />
      </ReportHeader>
      <ReportTable
        columns={vehicleColumns}
        searchColumn="name"
        data={vehiclesData.vehicles}
        isloadingData={isVehiclesLoading}
        onPaginationChange={handlePaginationChange}
        totalItems={vehiclesData.totalCount}
      />
    </ReportContainer>
  );
}
