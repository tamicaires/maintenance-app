import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TruckIcon,
  ClockIcon,
  ListIcon,
  LayoutGridIcon,
  RefreshCwIcon,
} from "lucide-react";
import { MaintenanceCard } from "@/components/WorkShopDashboard/MaintenanceCard";
import { workOrders } from "@/mock";
import { MaintenanceTable } from "@/components/WorkShopDashboard/MaintenanceTable";
import { AnalyticsCard } from "@/components/WorkShopDashboard/AnalyticsCard";
import { QueueChart } from "./Charts/QueueChart";
import { TypeMaintenanceChart } from "./Charts/TypeMaintenaceChart";
import { ServiceChart } from "./Charts/ServicesChart";
import { IWorkOrder } from "@/interfaces/work-order.interface";

// Simulated real-time data
const generateRandomData = () => ({
  queueCount: Math.floor(Math.random() * 20),
  avgQueueTime: `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}:${Math.floor(Math.random() * 60)}`,
  avgPVTime: `${Math.floor(Math.random() * 24)}:${Math.floor(
    Math.random() * 60
  )}:${Math.floor(Math.random() * 60)}`,
  avgCOTime: `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}:${Math.floor(Math.random() * 60)}`,
  releasedCount: Math.floor(Math.random() * 30),
});

export default function MaintenanceDashboard() {
  const [viewMode, setViewMode] = useState("grid");
  const [dashboardData, setDashboardData] = useState(generateRandomData());

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log("estado mudou", id, newStatus);
  };

  const handleShowDetails = (workOrder: IWorkOrder) => {
    console.log("Details for work order", workOrder);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 bg-background pt-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Painel de Manutenção</h1>
          <h3 className="text-lg text-muted-foreground">
            Acompanhamento da oficina em tempo real
          </h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDashboardData(generateRandomData())}
              >
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atualizar dados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <AnalyticsCard
          title="Qtd. em Fila"
          value={dashboardData.queueCount}
          change={11.5}
          icon={TruckIcon}
        />
        <AnalyticsCard
          title="Média Tempo Fila"
          value={dashboardData.avgQueueTime}
          change={-3.2}
          icon={ClockIcon}
          expectedTime="02:00:00"
        />
        <AnalyticsCard
          title="Média Tempo PV"
          value={dashboardData.avgPVTime}
          change={-7.5}
          icon={ClockIcon}
          expectedTime="08:00:00"
        />
        <AnalyticsCard
          title="Média Tempo CO"
          value={dashboardData.avgCOTime}
          change={3.2}
          icon={ClockIcon}
          expectedTime="04:00:00"
        />
        <AnalyticsCard
          title="Qtd. Liberadas"
          value={dashboardData.releasedCount}
          change={5.7}
          icon={TruckIcon}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <QueueChart />
        <TypeMaintenanceChart />
        <ServiceChart />
      </div>

      <Tabs defaultValue="maintenance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="maintenance">Em Manutenção</TabsTrigger>
          <TabsTrigger value="queue">Em Fila</TabsTrigger>
          <TabsTrigger value="released">Liberadas</TabsTrigger>
        </TabsList>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Veículos em Manutenção</h2>
            <div className="space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {workOrders.map((workOrder) => (
                <MaintenanceCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  onStatusChange={handleStatusChange}
                  onShowDetails={handleShowDetails}
                />
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[600px] rounded-md border">
              <MaintenanceTable
                workOrders={workOrders}
                onStatusChange={handleStatusChange}
                onShowDetails={handleShowDetails}
              />
            </ScrollArea>
          )}
        </TabsContent>
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Veículos em Fila</CardTitle>
              <CardDescription>
                Lista de veículos aguardando manutenção.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] rounded-md border">
                <MaintenanceTable
                  workOrders={workOrders}
                  onStatusChange={handleStatusChange}
                  onShowDetails={handleShowDetails}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="released">
          <Card>
            <CardHeader>
              <CardTitle>Veículos Liberados</CardTitle>
              <CardDescription>
                Lista de veículos que já passaram pela manutenção.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] rounded-md border">
                <MaintenanceTable
                  workOrders={workOrders}
                  onStatusChange={handleStatusChange}
                  onShowDetails={handleShowDetails}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
