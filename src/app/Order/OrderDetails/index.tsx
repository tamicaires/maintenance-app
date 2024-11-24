import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { MobileWorkOrderDetails } from "@/components/WorkOrder/mobile-work-order-details";
import { WorkOrderHeader } from "@/components/WorkOrder/work-order-header";
import { WorkOrderOverview } from "@/components/WorkOrder/word-order-overview";
import { WorkOrderServices } from "@/components/WorkOrder/work-order-services";
import { WorkOrderParts } from "@/components/WorkOrder/work-order-parts";
import { WorkOrderHistory } from "@/components/WorkOrder/work-order-history";
import { WorkOrderQuickActions } from "@/components/WorkOrder/work-order-quick-actions";

type WorkOrderDetailsProps = {
  workOrder: IWorkOrder;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export function WorkOrderDetails({
  workOrder,
  isDialogOpen = false,
  setIsDialogOpen = () => {},
}: WorkOrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <MobileWorkOrderDetails
        workOrder={workOrder}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-4xl h-[95vh] p-0 gap-0">
        <ScrollArea className="h-full">
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
            <WorkOrderQuickActions
              workOrder={workOrder}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
