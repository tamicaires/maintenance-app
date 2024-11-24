import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { MobileWorkOrderHistory } from "./mobile-work-order-history";
import { MobileWorkOrderHeader } from "./mobile-work-order-header";
import { MobileWorkOrderOverview } from "./mobile-work-order-overview";
import { MobileWorkOrderServices } from "./mobile-work-order-services";
import { MobileWorkOrderParts } from "./mobile-work-order-parts";
import { calculateProgress, getStatusInfo } from "@/utils/work-order";

type MobileWorkOrderDetailsProps = {
  workOrder: IWorkOrder;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

const mockServices = [
  {
    id: "1",
    name: "Troca de óleo",
    status: "Concluído",
    technician: "Carlos Silva",
    duration: "30 min",
    cost: 150.00,
    notes: "Troca de óleo realizada com sucesso. Óleo sintético utilizado."
  },
  {
    id: "2",
    name: "Revisão elétrica",
    status: "Em Andamento",
    technician: "Ana Souza",
    duration: "1 hora",
    cost: 250.00,
    notes: "Verificação de fiação e conserto de curto-circuito."
  },
  {
    id: "3",
    name: "Alinhamento e balanceamento",
    status: "Pendente",
    technician: "Roberto Lima",
    duration: "45 min",
    cost: 120.00,
    notes: "Necessário aguardar autorização do cliente para iniciar."
  },
  {
    id: "4",
    name: "Troca de filtro de ar",
    status: "Concluído",
    technician: "Beatriz Martins",
    duration: "20 min",
    cost: 80.00,
  },
  {
    id: "5",
    name: "Reparação de freios",
    status: "Em Andamento",
    technician: "João Mendes",
    duration: "1 hora e 30 min",
    cost: 300.00,
    notes: "Substituição das pastilhas e verificação de fluido de freio."
  }
];

const mockParts = [
  {
    id: "1",
    name: "Filtro de Óleo",
    code: "FO12345",
    quantity: 10,
    status: "Em Estoque",
    cost: 45.00,
    supplier: "Auto Peças Brasil"
  },
  {
    id: "2",
    name: "Pastilha de Freio",
    code: "PF98765",
    quantity: 5,
    status: "Em Falta",
    cost: 120.00,
    supplier: "Freios & Cia"
  },
  {
    id: "3",
    name: "Correia Dentada",
    code: "CD45678",
    quantity: 7,
    status: "Em Estoque",
    cost: 80.00,
    supplier: "Mecânica Total"
  },
  {
    id: "4",
    name: "Amortecedor",
    code: "AM65432",
    quantity: 2,
    status: "Baixo Estoque",
    cost: 250.00,
    supplier: "Peças Automotivas LTDA"
  },
  {
    id: "5",
    name: "Velas de Ignição",
    code: "VI11223",
    quantity: 15,
    status: "Em Estoque",
    cost: 20.00,
    supplier: "Motores e Cia"
  }
];

const mockHistoryEvents = [
  {
    id: "1",
    date: "2024-10-12",
    description: "Serviço concluído",
    user: "Carlos Silva",
    details: "O serviço de troca de óleo foi concluído com sucesso."
  },
  {
    id: "2",
    date: "2024-10-13",
    description: "Peça encomendada",
    user: "Ana Souza",
    details: "Encomenda da peça 'Filtro de Óleo' realizada junto ao fornecedor Auto Peças Brasil."
  },
  {
    id: "3",
    date: "2024-10-14",
    description: "Revisão iniciada",
    user: "Roberto Lima",
    details: "Iniciada a revisão elétrica no veículo conforme solicitado pelo cliente."
  },
  {
    id: "4",
    date: "2024-10-15",
    description: "Peça recebida",
    user: "Beatriz Martins",
    details: "Recebido o item 'Correia Dentada' para o serviço de reparação."
  },
  {
    id: "5",
    date: "2024-10-16",
    description: "Atualização de status",
    user: "João Mendes",
    details: "O status do serviço de alinhamento foi atualizado para 'Em Andamento'."
  }
];

export function MobileWorkOrderDetails({
  workOrder,
  isDialogOpen,
  setIsDialogOpen,
}: MobileWorkOrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const statusInfo = getStatusInfo(workOrder.status);
  const progress = calculateProgress(workOrder.status);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-full h-[100vh] p-0 gap-0">
        <div className="flex flex-col h-full bg-background">
          <MobileWorkOrderHeader
            workOrder={workOrder}
            setIsDialogOpen={setIsDialogOpen}
            statusInfo={statusInfo}
            progressAnimation={progress}
          />
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1"
          >
            <ScrollArea className="flex-1 px-3 pb-16">
              <TabsContent value="overview">
                <MobileWorkOrderOverview
                  workOrder={workOrder}
                  statusInfo={statusInfo}
                />
              </TabsContent>
              <TabsContent value="services">
                <MobileWorkOrderServices services={mockServices}/>
              </TabsContent>
              <TabsContent value="parts">
                <MobileWorkOrderParts parts={mockParts}/>
              </TabsContent>
              <TabsContent value="history">
                <MobileWorkOrderHistory history={mockHistoryEvents} />
              </TabsContent>
            </ScrollArea>
            <TabsList className="grid w-full grid-cols-4 bg-background border-t h-14 fixed bottom-0 rounded-none">
              <TabsTrigger value="overview">Geral</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="parts">Peças</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
