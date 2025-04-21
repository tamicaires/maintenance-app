import { ReportTable } from "@/components/data-table/data-table";
import { ReportContainer } from "@/components/report/report-container";
import { ReportHeader } from "@/components/report/report-header";
import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";
import { IBox, IBoxWithCount } from "@/shared/types/box";
import { getDataOrDefault } from "@/utils/data";
import { useDialog } from "@/context/dialog";
import { IServiceAssignmentCollumsData, serviceAssignmentColumns } from "../data/collums";
import { useServiceAssigmentsByWorkOrder } from "../hooks/use-service-assigments-by-order";
import { useServiceAssigments } from "../hooks/use-service-assigment";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ServiceAssigmentPage() {
  // const { openDialog } = useDialog();

  // const [filters, setFilters] = useState<IBoxFilters>({});

  // const { data, error, isLoading: isBoxLoading } = useBoxes(filters);
  const { data, isLoading: isServiceAssigmentLoading } = useServiceAssigments();
  const serviceAssigments = data || [];
  // const serviceAssigments: IServiceAssignment[] = useMemo(
  //   () => ({
  //     boxes: getDataOrDefault<IBox[]>(data, [], "boxes"),
  //     totalCount: getDataOrDefault<number>(data, 0, "totalCount"),
  //   }),
  //   [data]
  // );
  const serviceAssigmentData: IServiceAssignmentCollumsData[] = serviceAssigments.map((item) => ({
    serviceName: item.service?.serviceName,
    serviceCategory: item.service?.serviceCategory,
    trailerPlate: item.trailer?.plate,
    status: item.status,
    startAt: item.startAt
      ? formatDate(new Date(item.startAt), "dd/MM HH:mm", { locale: ptBR })
      : "-",
    endAt: item.endAt
      ? formatDate(new Date(item.endAt), "dd/MM HH:mm", { locale: ptBR })
      : "-",
  }));

  // const handleCreateBox = () => {
  //   openDialog({
  //     title: "Cadastrar Box",
  //     content: <CreateBox />,
  //     size: "xl",
  //   });
  // };
  // if (error) {
  //   return <div>Ocorreu um erro: {error.message}</div>;
  // }

  // const handlePaginationChange = useCallback(
  //   (page: number, perPage: number) => {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       page: page.toString(),
  //       perPage: perPage.toString(),
  //     }));
  //   },

  //   []
  // );

  return (
    <ReportContainer>
      <ReportHeader title="Serviços" description="Gerencie designação de serviços e detalhes">
        <Button variant="secondary">Exportar Relatório</Button>
        {/* <Button variant="default" onClick={handleCreateBox}>
          Cadastrar Box
        </Button> */}
      </ReportHeader>
      <ReportTable
        columns={serviceAssignmentColumns}
        searchColumn="name"
        data={serviceAssigmentData}
        isloadingData={isServiceAssigmentLoading}
        onPaginationChange={() => {}}
        totalItems={10}
      />
    </ReportContainer>
  );
}
