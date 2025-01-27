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
import { AnalyticsCard } from "@/components/WorkShopDashboard/AnalyticsCard";
import { QueueChart } from "../Charts/QueueChart";
import { TypeMaintenanceChart } from "../Charts/TypeMaintenaceChart";
import { ServiceChart } from "../Charts/ServicesChart";
import type { IWorkOrder } from "@/shared/types/work-order.interface";
import { Boxes } from "../../Box/pages";
import { useDailyWorkOrders } from "../../work-order/hooks/use-daily-work-orders";
import { dateUtil } from "@/utils/date";
import { getDataOrDefault } from "@/utils/data";

export default function MaintenanceDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const { data } = useWorkOrder();
  // const workOrders = data?.data || [];

  const today = dateUtil.getTodayInterval();
  const { data: dailyOsData, isLoading: isDailyOSLoading } = useDailyWorkOrders(
    today.startDate.toISOString(),
    today.endDate.toISOString()
  );
  isDailyOSLoading
  console.log("dailyOsData", dailyOsData);

  const dailyWorkOrders = getDataOrDefault<IWorkOrder[]>(
    dailyOsData,
    [],
    "data.workOrders"
  );

  console.log("dailyWorkOrders", dailyWorkOrders);
  const dailyStatistics = dailyOsData?.data?.statistics;
  console.log("dailyStatistics", dailyStatistics);

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
              <Button variant="outline" size="icon" onClick={() => {}}>
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atualizar dados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        <AnalyticsCard
          title="Qtd. em Fila"
          value={dailyStatistics?.queueCount.value}
          change={dailyStatistics?.queueCount.change}
          icon={TruckIcon}
        />
        <AnalyticsCard
          title="Média Tempo Fila"
          value={dailyStatistics?.avgQueueTime.value}
          change={dailyStatistics?.avgQueueTime.change}
          icon={ClockIcon}
          isTimeValue
          expectedTime="02:00:00"
        />
        <AnalyticsCard
          title="Média Tempo PV"
          value={dailyStatistics?.avgPVTime.value}
          change={dailyStatistics?.avgPVTime.change}
          icon={ClockIcon}
          isTimeValue
          expectedTime="08:00:00"
        />
        <AnalyticsCard
          title="Média Tempo CO"
          value={dailyStatistics?.avgCOTime.value}
          change={dailyStatistics?.avgCOTime.change}
          icon={ClockIcon}
          isTimeValue
          expectedTime="04:00:00"
        />
        <AnalyticsCard
          title="Qtd. Liberadas"
          value={dailyStatistics?.releasedCount.value}
          change={dailyStatistics?.releasedCount.change}
          icon={TruckIcon}
        />
      </div>

      <div className="flex w-full gap-6">
        <Tabs defaultValue="maintenance" className="space-y-4 w-full">
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
            <Boxes viewMode="grid" />
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
                  <Boxes viewMode="list" />
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
                  <Boxes viewMode="list" />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="grid gap-4 grid-cols-1 sm:min-w-96">
          <QueueChart />
          <TypeMaintenanceChart workOrders={dailyWorkOrders} />
          <ServiceChart />
        </div>
      </div>
    </div>
  );
}
