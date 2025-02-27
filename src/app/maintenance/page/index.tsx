import { useState } from "react";
import {
  useWorkOrder,
  type IWorkOrderFilters,
} from "@/app/work-order/hooks/use-work-order";
import { ReportTable } from "@/components/data-table/data-table";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IWorkOrder } from "@/shared/types/work-order.interface";
import { getDataOrDefault } from "@/utils/data";
import { maintenanceColumns } from "../data/collumns";
import type { ITableFilterOption } from "@/components/data-table/data-table-toolbar";
import WorkOrderFilters from "@/app/work-order/components/work-order-filter/work-order-filters";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import ExportButton from "@/components/export-button/export-button";
import { reportMaintenanceColumns } from "../data/export-collumns";

export function MaintenanceReport() {
  const [filters, setFilters] = useState<IWorkOrderFilters>({});
  const { data, isLoading } = useWorkOrder({
    ...filters,
    status: [MaintenanceStatus.FINALIZADA, MaintenanceStatus.CANCELADA],
  });
  const maintenanceData = getDataOrDefault<IWorkOrder[]>(data, [], "data");
  console.log("filters", filters);
  const handleFiltersChange = (newFilters: Partial<IWorkOrderFilters>) => {
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
    {
      name: "Filtrar",
      render: <WorkOrderFilters onFiltersChange={handleFiltersChange} />,
    },
    {
      name: "Filtrar por Data",
      render: <DateRangePicker onRangeChange={handleDateRangeChange} />,
    },
  ];

  return (
    <ScrollArea>
      <ReportContainer>
        <ReportHeader
          title="Manutenções"
          description="Gerencie o histórico manutenções e acompanhe os detalhes"
        >
          <Button variant="secondary">Exportar Relatório</Button>
          <ExportButton
            data={maintenanceData}
            columns={reportMaintenanceColumns}
          />
        </ReportHeader>
        <ReportTable
          columns={maintenanceColumns}
          searchColumn="carrierName"
          data={maintenanceData}
          filterOptions={filterOptions}
          isloadingData={isLoading}
          onPaginationChange={(page, perPage) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              page: page.toString(),
              perPage: perPage.toString(),
            }));
          }}
          totalItems={data?.data?.length || 0}
        />
      </ReportContainer>
    </ScrollArea>
  );
}
