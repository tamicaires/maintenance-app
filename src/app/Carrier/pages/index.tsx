import { ScrollArea } from "@/components/ui/scroll-area";
import { useCarrier } from "../hooks/use-carrier";
import { useState } from "react";
import { ReportTable } from "@/components/data-table/data-table";
import { carrierColumns } from "../data/collums";
import { Button } from "@/components/ui/button";
import { ReportHeader } from "@/components/report/report-header";
import { ReportContainer } from "@/components/report/report-container";
import { getDataOrDefault } from "@/utils/data";
import { CreateCarrier } from "../components/create-carrier";

const tabs = [
  { value: "all", label: "Todas", count: 85 },
  { value: "active", label: "Ativas", count: 24 },
  { value: "inactive", label: "Inativas", count: 12 },
];

const filterOptions = [
  {
    name: "Status",
    options: [
      { label: "Todas", value: "all" },
      { label: "Ativas", value: "active" },
      { label: "Inativas", value: "inactive" },
    ],
  },
];

export function Carrier() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { data: carrierData, isLoading } = useCarrier();
  const carriers = getDataOrDefault(carrierData, [], "data");

  // if (isLoading) {
  //   return <div>Carregando...</div>;
  // }

  const handleOpenModal = () => {
    setIsDialogOpen(true);
  };

  return (
    <ScrollArea>
      <ReportContainer>
        <ReportHeader
          title="Transportadoras"
          description="Gerencie as transportadoras cadastradas"
        >
          <Button variant="secondary">Exportar Relatório</Button>
          <Button onClick={handleOpenModal}>Cadastrar Novo</Button>
        </ReportHeader>
        <ReportTable
          columns={carrierColumns}
          searchColumn="carrierName"
          data={carriers}
          tabs={tabs}
          filterOptions={filterOptions}
          isloadingData={isLoading}
          onPaginationChange={() => {}}
          totalItems={carriers.length}
        />
        <CreateCarrier
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </ReportContainer>
    </ScrollArea>
  );
}
