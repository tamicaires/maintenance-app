import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { ReportTable } from "@/components/data-table/data-table";
import { ITrailerFilters, useTrailer } from "../hooks/use-trailer";
import { trailerColumns } from "../data/collumns";
import { TrailerCreationDialog } from "../components/create-trailer";
import { ITrailer, ITrailerWithCount } from "@/shared/types/trailer.interface";
import { getDataOrDefault } from "@/utils/data";

export function Trailer() {
  const [filters, setFilters] = useState<ITrailerFilters>({});

  const { data, error, isLoading: isTrailersLoading } = useTrailer(filters);
  const trailersData: ITrailerWithCount = {
    trailers: getDataOrDefault<ITrailer[]>(data, [], "trailers"),
    totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
  };

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
        title="Reboques"
        description="Gerencie os reboques das frotas"
      >
        <Button variant="secondary">Exportar Relatório</Button>
        <TrailerCreationDialog
          trigger={<Button variant="default">Cadastrar Reboque</Button>}
        />
      </ReportHeader>
      <ReportTable
        columns={trailerColumns}
        searchColumn="name"
        data={trailersData.trailers}
        isloadingData={isTrailersLoading}
        onPaginationChange={handlePaginationChange}
        totalItems={trailersData.totalCount}
      />
    </ReportContainer>
  );
}
