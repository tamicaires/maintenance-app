import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  ClockIcon,
  WrenchIcon,
  CheckCircleIcon,
  SearchIcon,
  XIcon,
  CalendarIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkOrderDetails } from "../components/work-order-details";
import { DailyChart } from "@/components/DailyChart/DailyChart";
import { WorkOrderCreationDialog } from "@/app/work-order/components/create-order-dialog";
import { useWorkOrder } from "../hooks/use-work-order";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import EmptyState from "@/components/empty-state";
import WorkOrderCard from "@/components/WorkOrderCard";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Schedule } from "@/components/schedule/schedule";

export default function Order() {
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<IWorkOrder | null>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, invalidateWorkOrders } = useWorkOrder();
  const workOrders = data?.data || [];

  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter((order) => {
      const matchesTab =
        activeTab === "todas" ||
        (activeTab === "fila" && order.status === MaintenanceStatus.FILA) ||
        (activeTab === "manutencao" &&
          order.status === MaintenanceStatus.MANUTENCAO) ||
        (activeTab === "aguard-peca" &&
          order.status === MaintenanceStatus.AGUARDANDO_PECA);

      const matchesSearch = order.fleetInfo.fleetNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, workOrders, searchQuery]);

  const summaryItems = [
    {
      icon: ClockIcon,
      label: "Frotas em fila",
      value: workOrders
        .filter((order) => order.status === MaintenanceStatus.FILA)
        .length.toString(),
      color: "yellow",
    },
    {
      icon: WrenchIcon,
      label: "Frotas em Manutenção",
      value: workOrders
        .filter((order) => order.status === MaintenanceStatus.MANUTENCAO)
        .length.toString(),
      color: "blue",
    },
    {
      icon: CheckCircleIcon,
      label: "Frotas Finalizado",
      value: workOrders
        .filter((order) => order.status === MaintenanceStatus.FINALIZADA)
        .length.toString(),
      color: "green",
    },
  ];

  const planejamento = [
    { numero: "22542", transportador: "3T Transportes", ultima: "12/03/2024" },
    { numero: "22399", transportador: "Tecnoserv", ultima: "12/03/2024" },
    { numero: "22455", transportador: "Truck Diesel", ultima: "12/03/2024" },
    { numero: "22533", transportador: "Solimões LTDA", ultima: "12/03/2024" },
  ];

  const handleOpenDialog = (workOrder: IWorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    invalidateWorkOrders(); // Invalidate and refetch when dialog closes
  };

  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return `Nenhuma ordem de serviço encontrada para "${searchQuery}".`;
    }
    switch (activeTab) {
      case "fila":
        return "Não há ordens de serviço em fila no momento.";
      case "manutencao":
        return "Não há ordens de serviço em manutenção no momento.";
      case "aguard-peca":
        return "Não há ordens de serviço aguardando peças no momento.";
      default:
        return "Não há ordens de serviço disponíveis.";
    }
  };

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <span key={index} className="bg-yellow-200 font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="container flex flex-col bg-background mt-14 p-4 md:px-6 max-h-full">
      <div className="flex flex-col lg:flex-row gap-5">
        <main className="flex-1 bg-card p-4 md:p-6 shadow-lg rounded-xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
          >
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Ordem de Serviços
              </h1>
              <p className="text-muted-foreground">
                Gerenciamento de Ordem de Serviço abertas
              </p>
            </div>
            <WorkOrderCreationDialog />
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="my-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-xl p-1">
              <TabsTrigger value="todas">
                Todas
              </TabsTrigger>
              <TabsTrigger value="fila">
                Fila
              </TabsTrigger>
              <TabsTrigger value="manutencao">
                Manutenção
              </TabsTrigger>
              <TabsTrigger value="aguard-peca">
                Aguard. Peça
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Buscar por número da frota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="overflow-y-auto max-h-screen">
            <AnimatePresence>
              {!isLoading && filteredWorkOrders.length === 0 && (
                <EmptyState message={getEmptyStateMessage()} />
              )}
              {filteredWorkOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  handleOpenDialog={handleOpenDialog}
                  highlightMatch={highlightMatch}
                />
              ))}
            </AnimatePresence>
          </div>
        </main>

        <aside className="w-full lg:w-96">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Schedule showCalendarOnly/>
            <ScrollArea className="shadow-lg rounded-xl p-4 md:p-6 bg-card">
              <div className="pb-5">
                <h2 className="text-2xl font-semibold leading-tight tracking-tight">
                  Resumo do dia
                </h2>
                <h2 className="text-sm text-muted-foreground">
                  {format(new Date(), "EEEE dd/MM/yyyy", {
                    locale: ptBR,
                  }).replace(/^\w/, (c) => c.toUpperCase())}
                </h2>
              </div>

              <div className="space-y-4">
                {summaryItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-${item.color}-500 bg-opacity-15 border p-2 border-${item.color}-500 rounded-lg`}
                      >
                        <item.icon
                          className={` h-5 w-5 text-${item.color}-500`}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-2xl font-bold">{item.value}</span>
                  </motion.div>
                ))}
              </div>
              <DailyChart />
              <Separator className="my-6" />

              <h2 className="text-lg font-semibold mb-4">
                Planejamento para{" "}
                {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}
              </h2>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {planejamento.map((frota, index) => (
                  <motion.div
                    key={index}
                    className="my-4 last:mb-0 p-3 bg-muted rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          Numero Frota: {frota.numero}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Transportador: {frota.transportador}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        ▼
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      Última preventiva: {frota.ultima}
                    </p>
                  </motion.div>
                ))}
              </ScrollArea>
            </ScrollArea>
          </motion.div>
        </aside>
        {selectedWorkOrder && (
          <WorkOrderDetails
            workOrderId={selectedWorkOrder.id}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
}
