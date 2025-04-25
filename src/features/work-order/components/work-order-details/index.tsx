import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkOrderHeader } from "@/features/work-order/components/work-order-details/work-order-header/work-order-header";
import { WorkOrderOverview } from "@/features/work-order/components/work-order-details/work-order-overview/word-order-overview";
import { WorkOrderServices } from "@/features/work-order/components/work-order-details/work-order-services/work-order-services";
import { WorkOrderHistory } from "@/features/work-order/components/work-order-details/work-order-history/work-order-history";
import { WorkOrderQuickActions } from "@/features/work-order/components/work-order-details/work-order-quick-actions/work-order-quick-actions";
import { WorkOrderParts } from "@/features/work-order/components/work-order-details/work-order-parts/work-order-parts";
import { useWorkOrderById } from "../../hooks/use-work-order-by-id";
import { WorkOrderSkeleton } from "./work-order-skeleton/work-order-skeleton";
import ErrorState from "@/components/states/error-state";
import { LoadingOverlay } from "@/components/loading-overlay";

type WorkOrderDetailsProps = {
  workOrderId: string;
};

export function WorkOrderDetails({ workOrderId }: WorkOrderDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const { data, isLoading } = useWorkOrderById(workOrderId);
  const workOrder = data;

  return (
    <ScrollArea className="h-[85vh] rounded-lg">
      <LoadingOverlay isLoading={isLoading} fallback={<WorkOrderSkeleton />}>
        {workOrder ? (
          <div className="flex flex-col h-full">
            <WorkOrderHeader workOrder={workOrder} />
            <div className="flex-1 px-6 py-3 pb-32">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-1">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="parts">Peças</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <WorkOrderOverview workOrder={workOrder} />
                </TabsContent>
                <TabsContent value="services">
                  <WorkOrderServices workOrder={workOrder} />
                </TabsContent>
                <TabsContent value="parts">
                  <WorkOrderParts workOrder={workOrder} />
                </TabsContent>
                <TabsContent value="history">
                  <WorkOrderHistory workOrder={workOrder} />
                </TabsContent>
              </Tabs>
            </div>
            <WorkOrderQuickActions workOrder={workOrder} onClose={() => {}} />
          </div>
        ) : (
          <ErrorState icon="critical" message="Nenhum dado encontrado" />
        )}
      </LoadingOverlay>
    </ScrollArea>
  );
}
