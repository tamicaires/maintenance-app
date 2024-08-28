import { useState } from "react";
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
import {
  ClockIcon,
  WrenchIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { OrderDetails } from "./OrderDetails";
import { DailyChart } from "@/components/DailyChart/DailyChart";

export default function Order() {
  const [activeTab, setActiveTab] = useState("todas");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const workOrders = [
    {
      id: "C0001",
      frota: "22222",
      tipo: "Corretiva",
      severidade: "Alta",
      transportadora: "S&G Transportes",
      abertura: "17/08/2024 11:33",
      status: "MANUTENÇÃO",
      tempoFila: "222:30",
      tempoManu: "205:29",
      criador: "Tamires Carvalho",
      progresso: 75,
    },
    {
      id: "C0003",
      frota: "22501",
      tipo: "Corretiva",
      severidade: "Baixa",
      transportadora: "Murat Transportes",
      abertura: "16/08/2024 18:09",
      status: "MANUTENÇÃO",
      tempoFila: "270:31",
      tempoManu: "243:29",
      criador: "Tamires Carvalho",
      progresso: 60,
    },
    {
      id: "C0004",
      frota: "22300",
      tipo: "Corretiva",
      severidade: "Alta",
      transportadora: "Murat Transportes",
      abertura: "16/08/2024 18:11",
      status: "FILA",
      tempoFila: "271:49",
      tempoManu: "0:00",
      criador: "Tamires Carvalho",
      progresso: 0,
    },
  ];

  const summaryItems = [
    {
      icon: ClockIcon,
      label: "Frotas em fila",
      value: "02",
      color: "yellow",
    },
    {
      icon: WrenchIcon,
      label: "Frotas em Manutenção",
      value: "02",
      color: "blue",
    },
    {
      icon: CheckCircleIcon,
      label: "Frotas Finalizado",
      value: "10",
      color: "green",
    },
  ];

  const planejamento = [
    { numero: "22542", transportador: "3T Transportes", ultima: "12/03/2024" },
    { numero: "22399", transportador: "Tecnoserv", ultima: "12/03/2024" },
    { numero: "22455", transportador: "Truck Diesel", ultima: "12/03/2024" },
    { numero: "22533", transportador: "Solimões LTDA", ultima: "12/03/2024" },
  ];

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col bg-background mt-14 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        <main className="flex-1 bg-card p-4 md:p-6 border rounded-lg">
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
            <Button className="bg-primary hover:bg-green-600 text-primary-foreground transition-colors duration-200 w-full md:w-auto">
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
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              {workOrders.map((workOrder, index) => (
                <motion.div
                  key={workOrder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-2 md:mb-0">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            {workOrder.id}
                          </Badge>
                          <p className="text-xl md:text-2xl font-semibold flex items-center mt-1">
                            Frota {workOrder.frota}
                          </p>
                        </div>
                        <Badge
                          variant={
                            workOrder.status === "MANUTENÇÃO"
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
                                  {workOrder.tipo}
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
                                  {workOrder.severidade === "Alta" && (
                                    <AlertTriangleIcon className="mr-1 h-4 w-4 text-red-500" />
                                  )}
                                  {workOrder.severidade}
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
                            {workOrder.transportadora}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Abertura OS</p>
                          <p className="text-muted-foreground flex items-center">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            {workOrder.abertura}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex flex-col md:flex-row justify-between items-start md:items-center pt-6">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt={workOrder.criador}
                          />
                          <AvatarFallback>
                            {workOrder.criador
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {workOrder.criador}
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
                                <p className="text-sm">{workOrder.tempoFila}</p>
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
                                <p className="text-sm">{workOrder.tempoManu}</p>
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
                          onClick={handleOpenDialog}
                        >
                          VER DETALHES
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        <aside className="w-full lg:w-96">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollArea className="rounded-md border p-4 md:p-6 bg-card">
              <div className="pb-5">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
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
        <OrderDetails
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </div>
  );
}
