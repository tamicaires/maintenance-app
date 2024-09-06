import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  ClockIcon,
  WrenchIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderDetails } from "./OrderDetails";
import { DailyChart } from "@/components/DailyChart/DailyChart";
import { CreateWorkOrder } from "./CreateOrder";
import { useWorkOrder } from "./hooks/use-work-order";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { Spinner } from "@/components/Spinner";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { EmptyState } from "@/components/EmptyState";

export default function Order() {
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<IWorkOrder | null>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading } = useWorkOrder();
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

      const matchesSearch = order.fleetNumber
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

  const handleCreateOrder = () => {
    setIsCreateDialogOpen(true);
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
    <div className="flex flex-col bg-background mt-14 p-4 md:px-6 max-h-full">
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
            <Button
              onClick={handleCreateOrder}
              className="bg-primary hover:bg-green-600 text-primary-foreground transition-colors duration-200 w-full md:w-auto"
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Abrir Ordem de Serviço
            </Button>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="my-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-xl bg-muted p-1">
              <TabsTrigger value="todas" className="rounded-lg">
                Todas
              </TabsTrigger>
              <TabsTrigger value="fila" className="rounded-lg">
                Fila
              </TabsTrigger>
              <TabsTrigger value="manutencao" className="rounded-lg">
                Manutenção
              </TabsTrigger>
              <TabsTrigger value="aguard-peca" className="rounded-lg">
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
              {isLoading && <Spinner />}
              {!isLoading && filteredWorkOrders.length === 0 && (
                <EmptyState message={getEmptyStateMessage()} />
              )}
              {filteredWorkOrders.map((workOrder, index) => (
                <motion.div
                  key={workOrder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden mb-4">
                    <CardHeader className="bg-muted">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-2 md:mb-0">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            {workOrder.displayId}
                          </Badge>
                          <p className="text-xl md:text-2xl font-semibold flex items-center mt-1">
                            Frota{" "}
                            <span className="ml-2">
                              {highlightMatch(workOrder.fleetNumber)}
                            </span>
                          </p>
                        </div>
                        <Badge
                          variant={
                            workOrder.status === MaintenanceStatus.MANUTENCAO
                              ? "secondary"
                              : "default"
                          }
                          className="text-sm px-3 py-1"
                        >
                          {workOrder.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <p className="text-sm font-medium">
                                  Plano de Manutenção
                                </p>
                                <p className="text-muted-foreground">
                                  {workOrder.typeOfMaintenance}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Plano de manutenção necessária</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <p className="text-sm font-medium">
                                  Grau de Severidade
                                </p>
                                <p className="text-muted-foreground flex items-center">
                                  {workOrder.severityLevel === "Alta" && (
                                    <AlertTriangleIcon className="mr-1 h-4 w-4 text-red-500" />
                                  )}
                                  {workOrder.severityLevel}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Nível de urgência da manutenção</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div>
                          <p className="text-sm font-medium">Transportadora</p>
                          <p className="text-muted-foreground">
                            {workOrder.carrierName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Abertura OS</p>
                          <p className="text-muted-foreground flex items-center">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            {workOrder.createdAt}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex flex-col md:flex-row justify-between items-start md:items-center pt-6">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt={workOrder.createdBy}
                          />
                          <AvatarFallback>
                            {workOrder.createdBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {workOrder.createdBy}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Criado por
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <ClockIcon className="mr-1 h-4 w-4 text-primary" />
                                <p className="text-sm">
                                  {workOrder.queueDuration}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Tempo em fila</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <WrenchIcon className="mr-1 h-4 w-4 text-primary" />
                                <p className="text-sm">
                                  {workOrder.maintenanceDuration}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Tempo em manutenção</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleOpenDialog(workOrder)}
                        >
                          VER DETALHES
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
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
            <ScrollArea className="shadow-lg rounded-xl p-4 md:p-6 bg-card">
              <div className="pb-5">
                <h2 className="text-2xl font-semibold leading-tight tracking-tight">
                  Resumo do dia
                </h2>
                <h2 className="text-sm text-muted-foreground">
                  Quarta-feira 27/08/2024
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
                Planejamento para 26 agosto 2024
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
          <OrderDetails
            workOrder={selectedWorkOrder}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
        <CreateWorkOrder
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
        />
      </div>
    </div>
  );
}
