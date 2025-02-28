import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ClockIcon,
  WrenchIcon,
  AlertTriangleIcon,
  CalendarIcon,
  Eye,
  Pause,
} from "lucide-react";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import WorkOrderStatusBadge from "../WorkOrderStatusBadge";
import { WorkOrderDetails } from "@/app/work-order/components/work-order-details";
import { Profile } from "../Profile";
import { dateUtil } from "@/utils/date";

interface WorkOrderCardProps {
  workOrder: IWorkOrder;
  highlightMatch: (text: string) => React.ReactNode;
}

export default function WorkOrderCard({
  workOrder,
  highlightMatch,
}: WorkOrderCardProps) {
  const hasEntryQueue = workOrder.entryQueue !== null;
  const hasEntryMaintenance = workOrder.entryMaintenance !== null;
  const hasWaitingParts = workOrder.startWaitingParts !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden mb-4">
        <CardHeader className="bg-muted/80">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-2 md:mb-0">
              <Badge
                variant="secondary"
                className="bg-blue-700/15 text-blue-600 hover:bg-blue-200"
              >
                {workOrder.displayId}
              </Badge>
              <p className="text-xl md:text-2xl font-semibold flex items-center mt-1">
                Frota{" "}
                <span className="ml-2">
                  {highlightMatch(workOrder.fleet.fleetNumber)}
                </span>
              </p>
            </div>

            <WorkOrderStatusBadge workOrder={workOrder} />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <p className="text-sm font-medium">Plano de Manutenção</p>
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
                    <p className="text-sm font-medium">Grau de Severidade</p>
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
                {workOrder.fleet.carrierName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Abertura OS</p>
              <p className="text-muted-foreground flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {format(new Date(workOrder.createdAt), "dd/MM/yyyy HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex flex-col md:flex-row justify-between items-start md:items-center pt-6">
          <div className="w-1/3">
            <Profile
              name={workOrder.openedBy.name}
              description="Criado por"
              descriptionPosition="top"
              showAvatar
            />
          </div>
          <div className="flex">
            <div className="flex items-center justify-end pr-4">
              {hasEntryQueue && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center w-24">
                        <ClockIcon className="mr-1 h-4 w-4 text-primary" />
                        <p className="text-sm">
                          {dateUtil.calculateDuration(
                            workOrder.entryQueue,
                            workOrder.entryMaintenance
                          )}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tempo em fila</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {hasEntryMaintenance && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center w-24">
                        <WrenchIcon className="mr-1 h-4 w-4 text-primary" />
                        <p className="text-sm">
                          {dateUtil.calculateDuration(
                            workOrder.entryMaintenance,
                            workOrder.exitMaintenance
                          )}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tempo em manutenção</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {hasWaitingParts && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center w-24">
                        <Pause className="mr-1 h-4 w-4 text-primary" />
                        <p className="text-sm">
                          {dateUtil.calculateDuration(
                            workOrder.startWaitingParts,
                            workOrder.endWaitingParts
                          )}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tempo aguardando peças</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <WorkOrderDetails
              workOrderId={workOrder.id}
              trigger={
                <Button variant="default" size="sm" className="ml-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  VER DETALHES
                </Button>
              }
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
