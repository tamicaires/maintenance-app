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
  AlertTriangleIcon,
  CalendarIcon,
} from "lucide-react";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { MaintenanceStatus } from "@/shared/enums/work-order";

interface WorkOrderCardProps {
  workOrder: IWorkOrder;
  handleOpenDialog: (workOrder: IWorkOrder) => void;
  highlightMatch: (text: string) => React.ReactNode;
}

export default function WorkOrderCard({
  workOrder,
  handleOpenDialog,
  highlightMatch,
}: WorkOrderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
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
              <p className="text-muted-foreground">{workOrder.carrierName}</p>
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
              <p className="text-sm font-medium">{workOrder.createdBy}</p>
              <p className="text-xs text-muted-foreground">Criado por</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4 text-primary" />
                    <p className="text-sm">{workOrder.queueDuration}</p>
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
                    <p className="text-sm">{workOrder.maintenanceDuration}</p>
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
  );
}
