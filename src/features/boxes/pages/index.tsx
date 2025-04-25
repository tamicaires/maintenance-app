import { ReportTable } from "@/components/data-table/data-table";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { Button } from "@/components/ui/button";
import { boxColumns } from "../data/box-collumns";
import { useCallback, useMemo, useState } from "react";
import { IBoxFilters, useBoxes } from "../hooks/use-box";
import { IBox, IBoxWithCount } from "@/shared/types/box";
import { getDataOrDefault } from "@/utils/data";
import { CreateBox } from "../components/create-box/create-box";
import { useDialog } from "@/core/providers/dialog";

export function BoxPage() {
  const { openDialog } = useDialog();

  const [filters, setFilters] = useState<IBoxFilters>({});

  const { data, error, isLoading: isBoxLoading } = useBoxes(filters);
  const boxesData: IBoxWithCount = useMemo(
    () => ({
      boxes: getDataOrDefault<IBox[]>(data, [], "boxes"),
      totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
    }),
    [data]
  );

  const handleCreateBox = () => {
    openDialog({
      title: "Cadastrar Box",
      content: <CreateBox />,
      size: "xl",
    });
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
      <ReportHeader title="Boxes" description="Gerencie Boxes e detalhes">
        <Button variant="secondary">Exportar Relatório</Button>
        <Button variant="default" onClick={handleCreateBox}>
          Cadastrar Box
        </Button>
      </ReportHeader>
      <ReportTable
        columns={boxColumns}
        searchColumn="name"
        data={boxesData.boxes}
        isloadingData={isBoxLoading}
        onPaginationChange={handlePaginationChange}
        totalItems={boxesData.totalCount}
      />
    </ReportContainer>
  );
}
