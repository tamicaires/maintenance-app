import { format } from "date-fns";
import {
  User,
  Calendar,
  Truck,
  Printer,
  Download,
  Share2,
  MoreVertical,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { calculateProgress, getStatusInfo } from "@/utils/work-order";

export function WorkOrderHeader({ workOrder }: { workOrder: IWorkOrder }) {
  const statusInfo = getStatusInfo(workOrder.status);
  const progressAnimation = calculateProgress(workOrder.status);

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Ordem de Serviço</h1>
              <Badge
                variant="outline"
                className="text-base px-3 py-0 bg-primary/5 border-primary/40 rounded-full text-primary"
              >
                {workOrder.displayId}
              </Badge> 
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Criada por {workOrder.createdBy}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(workOrder.createdAt), "dd/MM/yyyy HH:mm")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                <span>Frota: {workOrder.fleetInfo.fleetNumber}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Printer className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Imprimir OS</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exportar PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compartilhar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Ações da OS</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar OS</DropdownMenuItem>
                <DropdownMenuItem>Adicionar Comentário</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Cancelar OS
                </DropdownMenuItem>
                <DropdownMenuItem className="text-green-600">
                  Finalizar OS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-6 bg-card rounded-lg p-4 border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-${statusInfo.color}-100`}>
                <statusInfo.icon
                  className={`w-5 h-5 text-${statusInfo.color}-500`}
                />
              </div>
              <div>
                <p className="font-medium">{statusInfo.label}</p>
                <p className="text-sm text-muted-foreground">
                  {statusInfo.description}
                </p>
              </div>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Tempo Total: {workOrder.maintenanceDuration || 0} min
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">
                    Detalhamento do Tempo
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm">Tempo em Fila</p>
                      <p className="text-xs text-muted-foreground">
                        {workOrder.queueDuration || 0} min
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">Tempo em Manutenção</p>
                      <p className="text-xs text-muted-foreground">
                        {workOrder.maintenanceDuration || 0} min
                      </p>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Progress value={progressAnimation} className="h-2" />
        </div>
      </div>
    </div>
  );
}
