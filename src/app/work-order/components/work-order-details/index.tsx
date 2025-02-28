import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WorkOrderHeader } from "@/app/work-order/components/work-order-details/work-order-header/work-order-header"
import { WorkOrderOverview } from "@/app/work-order/components/work-order-details/work-order-overview/word-order-overview"
import { WorkOrderServices } from "@/app/work-order/components/work-order-details/work-order-services/work-order-services"
import { WorkOrderHistory } from "@/app/work-order/components/work-order-details/work-order-history/work-order-history"
import { WorkOrderQuickActions } from "@/app/work-order/components/work-order-details/work-order-quick-actions/work-order-quick-actions"
import { WorkOrderParts } from "@/app/work-order/components/work-order-details/work-order-parts/work-order-parts"
import { useWorkOrderById } from "../../hooks/use-work-order-by-id"
import { WorkOrderSkeleton } from "./work-order-skeleton/work-order-skeleton"

type WorkOrderDetailsProps = {
  workOrderId: string
  isDialogOpen?: boolean
  setIsDialogOpen?: (isOpen: boolean) => void
  trigger?: React.ReactNode
}

export function WorkOrderDetails({
  workOrderId,
  trigger,
  isDialogOpen: externalIsDialogOpen,
  setIsDialogOpen: externalSetIsDialogOpen,
}: WorkOrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [internalIsDialogOpen, setInternalIsDialogOpen] = useState(false)
  const [shouldFetchData, setShouldFetchData] = useState(false)

  const isControlled = externalIsDialogOpen !== undefined
  const isOpen = isControlled ? externalIsDialogOpen : internalIsDialogOpen

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setShouldFetchData(true)
      }
      if (isControlled) {
        externalSetIsDialogOpen?.(open)
      } else {
        setInternalIsDialogOpen(open)
      }
    },
    [isControlled, externalSetIsDialogOpen],
  )
  
  const { data, isLoading } = useWorkOrderById(workOrderId, {
    enabled: shouldFetchData,
  })


  const workOrder = data?.data
console.log("workOrder", workOrder)
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full">{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[95vh] p-0 gap-0">
        <ScrollArea className="h-full">
          {isLoading ? (
            <div className="p-6">
              <WorkOrderSkeleton />
            </div>
          ) : workOrder ? (
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
              <WorkOrderQuickActions workOrder={workOrder} onClose={() => onOpenChange(false)} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">Nenhum dado encontrado</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

