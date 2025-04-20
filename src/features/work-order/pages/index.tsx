import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  ClockIcon,
  WrenchIcon,
  CheckCircleIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkOrderCreationDialog } from "@/features/work-order/components/create-order-dialog";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import EmptyState from "@/components/empty-state";
import WorkOrderCard from "@/features/work-order/components/work-order-card";
import WorkOrderRecentActivityFeed from "../components/recent-activity-order/recent-activity-work-order";
import { QueueChart } from "@/features/workshop-dashboard/components/charts/queue-chart";
import {
  MaintenanceSummary,
  SummaryItem,
} from "../components/maintenance-summary/maintenance-summary";
import { WorkOrderHeader } from "../components/work-order-header/work-order-header";
import { getMaintenanceEmptyStateMessage } from "@/utils/work-order";
import { dateUtil } from "@/utils/date";
import { useDailyWorkOrders } from "../hooks/use-daily-work-orders";
import { getDataOrDefault } from "@/utils/data";
import { IWorkOrder } from "@/shared/types/work-order.interface";

export default function Order() {
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const today = dateUtil.getTodayInterval();
  const { data: dailyOsData, isLoading: isDailyOSLoading } = useDailyWorkOrders(
    today.startDate.toISOString(),
    today.endDate.toISOString()
  );

  const dailyWorkOrders = getDataOrDefault<IWorkOrder[]>(
    dailyOsData,
    [],
    "workOrders"
  );
  console.log("dailyWorkOrders", dailyWorkOrders);

  const filteredWorkOrders = useMemo(() => {
    return dailyWorkOrders.filter((order) => {
      const matchesTab =
        activeTab === "todas" ||
        (activeTab === "fila" && order.status === MaintenanceStatus.FILA) ||
        (activeTab === "manutencao" &&
          order.status === MaintenanceStatus.MANUTENCAO) ||
        (activeTab === "aguard-peca" &&
          order.status === MaintenanceStatus.AGUARDANDO_PECA);

      const matchesSearch = order.fleet.fleetNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, dailyWorkOrders, searchQuery]);

  const summaryItems: SummaryItem[] = [
    {
      icon: ClockIcon,
      label: "Frotas em fila",
      value: dailyWorkOrders
        .filter((order) => order.status === MaintenanceStatus.FILA)
        .length.toString(),
      color: "yellow",
    },
    {
      icon: WrenchIcon,
      label: "Frotas em Manutenção",
      value: dailyWorkOrders
        .filter((order) => order.status === MaintenanceStatus.MANUTENCAO)
        .length.toString(),
      color: "blue",
    },
    {
      icon: CheckCircleIcon,
      label: "Frotas Finalizado",
      value: dailyWorkOrders
        .filter((order) => order.status === MaintenanceStatus.FINALIZADA)
        .length.toString(),
      color: "green",
    },
  ];

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
    <div className="container flex flex-col bg-background mt-14 p-3 md:px-6 max-h-full">
      <div className="flex flex-col lg:flex-row gap-5">
        <main className="flex-1 bg-card p-4 md:p-6 shadow-lg rounded-xl">
          <WorkOrderHeader
            title="Ordens de Serviço"
            subtitle="Gerenciamento de Ordem de Serviço abertas"
            actionButton={<WorkOrderCreationDialog />}
          />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="my-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-xl p-1">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="fila">Fila</TabsTrigger>
              <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
              <TabsTrigger value="aguard-peca">Aguard. Peça</TabsTrigger>
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
              {!isDailyOSLoading && filteredWorkOrders.length === 0 && (
                <EmptyState
                  message={getMaintenanceEmptyStateMessage(
                    searchQuery,
                    activeTab
                  )}
                />
              )}
              {filteredWorkOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
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
            <ScrollArea className="shadow-lg p-4 md:p-6 bg-card space-y-4">
              <MaintenanceSummary items={summaryItems} />
              <QueueChart />
              <WorkOrderRecentActivityFeed />
            </ScrollArea>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
