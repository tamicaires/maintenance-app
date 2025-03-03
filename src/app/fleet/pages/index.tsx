import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ReportHeader } from "@/components/report/report-header";
import { ReportContainer } from "@/components/report/report-container";
import { getDataOrDefault } from "@/utils/data";
import { IFleetFilters, useFleet } from "../hooks/use-fleet";
import { fleetCollumns } from "@/app/fleet/data/fleetCollumns";
import { useState } from "react";
import { ITableFilterOption } from "@/components/data-table/data-table-toolbar";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { FleetCreationDialog } from "@/app/fleet/components/create-fleet";
import { Plus } from "lucide-react";

const tabs = [
  { value: "all", label: "Todas", count: 85 },
  { value: "active", label: "Ativas", count: 24 },
  { value: "inactive", label: "Inativas", count: 12 },
];

export function Fleet() {
  const [filters, setFilters] = useState<IFleetFilters>({});

  const { data: fleetData, isLoading } = useFleet(filters);
  const fleets = getDataOrDefault(fleetData, [], "data");

  const handleFiltersChange = (newFilters: Partial<IFleetFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: range.from,
      endDate: range.to,
    }));
  };

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
          description="Gerencie as frotas cadastradas"
        >
          <Button variant="secondary">Exportar Relatório</Button>
          <FleetCreationDialog
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Cadastrar Frota
              </Button>
            }
          />
        </ReportHeader>
        <ReportTable
          columns={fleetCollumns}
          searchColumn="fleetNumber"
          data={fleets}
          tabs={tabs}
          filterOptions={filterOptions}
          isloadingData={isLoading}
          onPaginationChange={(page, perPage) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              page: page.toString(),
              perPage: perPage.toString(),
            }));
          }}
          totalItems={fleets.length}
        />
      </ReportContainer>
    </ScrollArea>
  );
}
