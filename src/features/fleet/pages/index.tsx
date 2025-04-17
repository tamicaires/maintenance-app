import { useCallback, useMemo, useState } from "react";
import { type IWorkOrderFilters } from "@/features/work-order/hooks/use-work-order";
import { ReportTable } from "@/components/data-table/data-table";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDataOrDefault } from "@/utils/data";
import type { ITableFilterOption } from "@/components/data-table/data-table-toolbar";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useFleet } from "@/features/fleet/hooks/use-fleet";
import { fleetCollumns } from "../data/fleetCollumns";
import { IFleet, IFleetWithCount } from "@/shared/types/fleet.interface";
import { FleetCreationDialog } from "../components/create-fleet";

export function Fleet() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<IWorkOrderFilters>({});
  const { data, isLoading: isFleetsLoading } = useFleet(filters);
  const fleetData: IFleetWithCount = useMemo(
    () => ({
      fleets: getDataOrDefault<IFleet[]>(data, [], "fleets"),
      totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
    }),
    [data]
  );

  // const handleFiltersChange = (newFilters: Partial<IWorkOrderFilters>) => {
  //   setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  // };

  const handleDateRangeChange = useCallback(
    (range: { from: Date; to: Date }) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        startDate: range.from,
        endDate: range.to,
      }));
    },
    []
  );

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
  const filterOptions: ITableFilterOption[] = [
    // {
    //   name: "Filtrar",
    //   render: <WorkOrderFilters onFiltersChange={handleFiltersChange} />,
    // },
    {
      name: "Filtrar por Data",
      render: <DateRangePicker onRangeChange={handleDateRangeChange} />,
    },
  ];
  return (
    <ScrollArea>
      <ReportContainer>
        <ReportHeader
          title="Frotas"
          description="Gerencie frotas e acompanhe os detalhes"
        >
          <Button variant="secondary">Exportar Relatório</Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Cadastrar Frota
          </Button>
        </ReportHeader>
        <ReportTable
          columns={fleetCollumns}
          searchColumn="fleetNumber"
          data={fleetData.fleets}
          filterOptions={filterOptions}
          isloadingData={isFleetsLoading}
          onPaginationChange={handlePaginationChange}
          totalItems={fleetData.totalCount}
        />
      </ReportContainer>
      {isCreateDialogOpen && (
        <FleetCreationDialog isOpen={isCreateDialogOpen} />
      )}
    </ScrollArea>
  );
}
