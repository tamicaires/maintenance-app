import {
  Calendar,
  Printer,
  Download,
  MoreVertical,
  Timer,
  MessageCircle,
  Edit3,
  XCircle,
  Pause,
  CornerUpLeft,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { IWorkOrder } from "@/shared/types/work-order.interface";
import {
  getMaintenanceStatusInfo,
  validateWorkOrderState,
} from "@/utils/work-order";
import { useCancelWorkOrder } from "../../hooks/use-cancel-work-order";
import { useToast } from "@/components/Toast/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { ShareContent } from "@/components/share-content/share-content";
import { StartWaitingPartsDialog } from "../actions-dialogs/start-waiting-parts-dialog";
import { Profile } from "@/components/Profile";
import { BackToQueueWorkOrderDialog } from "../actions-dialogs/back-to-queue";
import { formatDuration } from "@/utils/time";
import { StartChecklistDialog } from "@/app/checklist/components/start-checklist-dialog";
import { useChecklistByWorkOrder } from "@/app/checklist/checklist/hooks/use-checklist-by-work-order";
import { IChecklistWithRelationalData } from "@/shared/types/checklist/checklist";
import { Spinner } from "@/components/Spinner";
import ChecklistItems from "@/app/checklist/components/checklist-items";

export function WorkOrderHeader({ workOrder }: { workOrder: IWorkOrder }) {
  const { toast: addToast, ToastComponent } = useToast();

  const { handleCancelWorkOrder, isCancelPending } =
    useCancelWorkOrder(addToast);

  const { data, isLoading: isChecklistLoading } = useChecklistByWorkOrder(
    workOrder.id
  );
  const checklist = data?.data;


  const statusInfo = getMaintenanceStatusInfo(workOrder.status);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isBackToQueueDialogOpen, setIsBackToQueueDialogOpen] =
    useState<boolean>(false);

  const { isClosedWorkOrder, isInMaintenanceWorkOrder } =
    validateWorkOrderState(workOrder.status);

  const maintenanceDuration = formatDuration(
    workOrder.maintenanceDuration || 0
  );
  const queueDuration = formatDuration(workOrder.queueDuration || 0);

  const pathToShare = window.location.href;

  const handleEmailShare = async (email: string) => {
    // Simular o envio de e-mail (em um cenário real, isso seria feito no servidor)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("E-mail enviado para:", email);
  };

  const renderChecklist = (
    checklist: IChecklistWithRelationalData | null | undefined
  ) => {
    if (isChecklistLoading) {
      return <Spinner size="small" />;
    }
    console.log("checklsitdata", checklist);
    if (!checklist) {
      return (
        <StartChecklistDialog
          workOrderId={workOrder.id}
          trigger={
            <Button variant="default">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Checklist
            </Button>
          }
        />
      );
    }

    return (
      <ChecklistItems
        checklistId={checklist.id}
        checklistData={checklist}
        trigger={<Button>Ver Checklist</Button>}
      />
    );
  };
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
            <div className="flex items-center gap-4 text-sm ">
              <Profile
                name={"Thamires Carvalho"}
                description="criado por"
                descriptionPosition="top"
                showAvatar
              />
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {/* {format(new Date(workOrder.createdAt), "dd/MM/yyyy HH:mm")} */}{" "}
                  12/02/2024 15:00
                </span>
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
                    <ShareContent
                      contentId={workOrder.id}
                      contentType="Ordem de Serviço"
                      contentTitle="Manutenção Florestal"
                      shareLink={pathToShare}
                      onEmailShare={handleEmailShare}
                    />
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
                <DropdownMenuItem>
                  <Edit3 className="mr-2 h-3.5 w-3.5" />
                  <span>Editar OS</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="mr-2 h-3.5 w-3.5" />
                  <span>Adicionar Comentário</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isInMaintenanceWorkOrder && (
                  <DropdownMenuItem
                    onSelect={() => setIsBackToQueueDialogOpen(true)}
                  >
                    <CornerUpLeft className="mr-2 h-3.5 w-3.5" />
                    Voltar para fila
                  </DropdownMenuItem>
                )}
                {workOrder.status === MaintenanceStatus.MANUTENCAO && (
                  <StartWaitingPartsDialog workOrderId={workOrder.id}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Pause className="mr-2 h-3.5 w-3.5" />
                      Iniciar Aguardar Peça
                    </DropdownMenuItem>
                  </StartWaitingPartsDialog>
                )}
                {!isClosedWorkOrder && (
                  <DropdownMenuItem
                    className="text-red-600"
                    onSelect={() => setIsAlertDialogOpen(true)}
                  >
                    <XCircle className="mr-2 h-3.5 w-3.5" />
                    Cancelar OS
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-4 bg-card rounded-lg px-6 py-2 border shadow-sm">
          <div className="flex items-center justify-between py-2">
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
            <div className="flex gap-10">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Timer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Tempo Total: {maintenanceDuration} min
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
                          {queueDuration} min
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
              {workOrder.status === MaintenanceStatus.MANUTENCAO &&
                renderChecklist(checklist)}
            </div>
          </div>
        </div>

        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação é irreversível, cancelar a Ordem de Serviço não pode
                ser desfeito.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleCancelWorkOrder(workOrder.id)}
                disabled={isCancelPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isCancelPending ? "Cancelando..." : "Cancelar mesmo assim"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <BackToQueueWorkOrderDialog
          workOrderId={workOrder.id}
          isAlertDialogOpen={isBackToQueueDialogOpen}
          setIsAlertDialogOpen={setIsBackToQueueDialogOpen}
        />
      </div>
      <ToastComponent />
    </div>
  );
}
