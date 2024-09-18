import { useState, useMemo } from "react";
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
import { MaintenanceTable } from "@/components/WorkShopDashboard/MaintenanceTable";
import { AnalyticsCard } from "@/components/WorkShopDashboard/AnalyticsCard";
import { QueueChart } from "./Charts/QueueChart";
import { TypeMaintenanceChart } from "./Charts/TypeMaintenaceChart";
import { ServiceChart } from "./Charts/ServicesChart";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { useWorkOrder } from "../Order/hooks/use-work-order";
import {
  MaintenanceStatus,
  TypeOfMaintenance,
  Box,
} from "@/shared/enums/work-order";
import { EmptyCard } from "@/components/EmptyCard";
import { boxToNumber } from "@/utils/utils";
import { calculateAverageTime, calculateChange } from "@/utils/time";

export default function MaintenanceDashboard() {
  const [viewMode, setViewMode] = useState("grid");
  const { data, refetch } = useWorkOrder();
  const workOrders = data?.data || [];

  const dashboardData = useMemo(() => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    const calculateMetrics = (orders: IWorkOrder[]) => {
      const queueCount = orders.filter(
        (order) => order.status === MaintenanceStatus.FILA
      ).length;
      const avgQueueTime = calculateAverageTime(orders, MaintenanceStatus.FILA);
      const avgPVTime = calculateAverageTime(
        orders,
        MaintenanceStatus.MANUTENCAO,
        TypeOfMaintenance.PREVENTIVA
      );
      const avgCOTime = calculateAverageTime(
        orders,
        MaintenanceStatus.MANUTENCAO,
        TypeOfMaintenance.CORRETIVA
      );
      const releasedCount = orders.filter(
        (order) => order.status === MaintenanceStatus.FINALIZADA
      ).length;

      return { queueCount, avgQueueTime, avgPVTime, avgCOTime, releasedCount };
    };

    const currentMetrics = calculateMetrics(workOrders);
    const pastMetrics = calculateMetrics(
      workOrders.filter((order) => new Date(order.createdAt) < twoHoursAgo)
    );

    return {
      queueCount: {
        value: currentMetrics.queueCount,
        change: calculateChange(
          currentMetrics.queueCount,
          pastMetrics.queueCount
        ),
      },
      avgQueueTime: {
        value: currentMetrics.avgQueueTime,
        change: calculateChange(
          parseFloat(currentMetrics.avgQueueTime.replace(/:/g, "")),
          parseFloat(pastMetrics.avgQueueTime.replace(/:/g, ""))
        ),
      },
      avgPVTime: {
        value: currentMetrics.avgPVTime,
        change: calculateChange(
          parseFloat(currentMetrics.avgPVTime.replace(/:/g, "")),
          parseFloat(pastMetrics.avgPVTime.replace(/:/g, ""))
        ),
      },
      avgCOTime: {
        value: currentMetrics.avgCOTime,
        change: calculateChange(
          parseFloat(currentMetrics.avgCOTime.replace(/:/g, "")),
          parseFloat(pastMetrics.avgCOTime.replace(/:/g, ""))
        ),
      },
      releasedCount: {
        value: currentMetrics.releasedCount,
        change: calculateChange(
          currentMetrics.releasedCount,
          pastMetrics.releasedCount
        ),
      },
    };
  }, [workOrders]);

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log("estado mudou", id, newStatus);
    // Implement status change logic here
  };

  const handleShowDetails = (workOrder: IWorkOrder) => {
    console.log("Details for work order", workOrder);
    // Implement show details logic here
  };

  const boxesWithWorkOrders = useMemo(() => {
    const boxes = Object.values(Box);
    return boxes
      .map((box) => {
        const workOrder = workOrders.find(
          (order) =>
            order.status === MaintenanceStatus.MANUTENCAO && order.box === box
        );
        return { box, workOrder, boxNumber: boxToNumber(box) };
      })
      .sort((a, b) => a.boxNumber - b.boxNumber);
  }, [workOrders]);

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
              <Button variant="outline" size="icon" onClick={() => refetch()}>
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
          value={dashboardData.queueCount.value}
          change={dashboardData.queueCount.change}
          icon={TruckIcon}
        />
        <AnalyticsCard
          title="Média Tempo Fila"
          value={dashboardData.avgQueueTime.value}
          change={dashboardData.avgQueueTime.change}
          icon={ClockIcon}
          expectedTime="02:00:00"
        />
        <AnalyticsCard
          title="Média Tempo PV"
          value={dashboardData.avgPVTime.value}
          change={dashboardData.avgPVTime.change}
          icon={ClockIcon}
          expectedTime="08:00:00"
        />
        <AnalyticsCard
          title="Média Tempo CO"
          value={dashboardData.avgCOTime.value}
          change={dashboardData.avgCOTime.change}
          icon={ClockIcon}
          expectedTime="04:00:00"
        />
        <AnalyticsCard
          title="Qtd. Liberadas"
          value={dashboardData.releasedCount.value}
          change={dashboardData.releasedCount.change}
          icon={TruckIcon}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <QueueChart workOrders={workOrders} />
        <TypeMaintenanceChart workOrders={workOrders} />
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {boxesWithWorkOrders.map(({ box, workOrder, boxNumber }) => (
                <div key={box} className="h-full">
                  {workOrder ? (
                    <MaintenanceCard
                      workOrder={workOrder}
                      onShowDetails={handleShowDetails}
                    />
                  ) : (
                    <EmptyCard boxNumber={boxNumber.toString()} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[600px] rounded-md border">
              <MaintenanceTable
                workOrders={workOrders.filter(
                  (order) => order.status === MaintenanceStatus.MANUTENCAO
                )}
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
                  workOrders={workOrders.filter(
                    (order) => order.status === MaintenanceStatus.FILA
                  )}
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
                  workOrders={workOrders.filter(
                    (order) => order.status === MaintenanceStatus.FINALIZADA
                  )}
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
