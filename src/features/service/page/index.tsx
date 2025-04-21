import React, { useState } from "react";
import { IServiceFilters, useService } from "../hooks/use-service";
import { IService, IServiceWithCount } from "@/shared/types/service.interface";
import ServiceCreationDialog from "../components/create-service";
import { getDataOrDefault } from "@/utils/data";
import { ITableFilterOption } from "@/components/data-table/data-table-toolbar";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { ReportTable } from "@/components/data-table/data-table";
import { serviceColumns } from "../data/serviceCollumns";
import { ServiceCategory } from "@/shared/enums/service";
import { Button } from "@/components/ui/button";
import { Can } from "@/core/permissions/can";
import { ActionEnum, SubjectEnum } from "@/core/permissions/enum/ability";

export function Service() {
  const [filters, setFilters] = useState<IServiceFilters>({});

  const { data, error, isLoading: isServicesLoading } = useService(filters);
  const services: IServiceWithCount = React.useMemo(
    () => ({
      services: getDataOrDefault<IService[]>(data, [], "services"),
      totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
    }),
    [data]
  );

  const filterOptions: ITableFilterOption[] = [
    {
      name: "Filtrar",
      options: Object.values(ServiceCategory).map((category) => ({
        label: category,
        value: category,
      })),
    },
  ];

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  const handlePaginationChange = React.useCallback(
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
    <>
      <ReportContainer>
        <ReportHeader
          title="Serviços"
          description="Gerencie serviços e acompanhe os detalhes"
        >
          <Button variant="secondary">Exportar Relatório</Button>
          <ServiceCreationDialog />
        </ReportHeader>
        <ReportTable
          columns={serviceColumns}
          searchColumn="fleetNumber"
          data={services.services}
          filterOptions={filterOptions}
          isloadingData={isServicesLoading}
          onPaginationChange={handlePaginationChange}
          totalItems={services.totalCount}
        />
      </ReportContainer>
    </>
  );
}
