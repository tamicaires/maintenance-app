import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  EmployeeFiltersType,
  useEmployee,
} from "@/features/employee/hooks/use-employee";
import {
  IEmployee,
  IEmployeeWithCount,
} from "@/shared/types/employee.interface";
import { getDataOrDefault } from "@/utils/data";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { ReportTable } from "@/components/data-table/data-table";
import { employeeColumns } from "../data/collumns";
import EmployeeCreationDialog from "../components/create-employee";

export function Employee() {
  const [filters, setFilters] = useState<EmployeeFiltersType>({});

  const { data, error, isLoading: isEmployeeLoading } = useEmployee(filters);
  const employees: IEmployeeWithCount = useMemo(
    () => ({
      employees: getDataOrDefault<IEmployee[]>(data, [], "employees"),
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
        title="Profissionais"
        description="Gerencie Profissionais Técnuicos e detalhes"
      >
        <Button variant="secondary">Exportar Relatório</Button>
        <EmployeeCreationDialog />
      </ReportHeader>
      <ReportTable
        columns={employeeColumns}
        searchColumn="name"
        data={employees.employees}
        isloadingData={isEmployeeLoading}
        onPaginationChange={handlePaginationChange}
        totalItems={employees.totalCount}
      />
    </ReportContainer>
  );
}
