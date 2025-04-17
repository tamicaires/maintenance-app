import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useBackToQueueWorkOrder } from "../../hooks/actions/use-back-to-queue";
import { useToast } from "@/components/Toast/toast";

type BackToQueueWorkOrderDialogProps = {
  workOrderId: string;
  isAlertDialogOpen: boolean;
  setIsAlertDialogOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

export function BackToQueueWorkOrderDialog({
  workOrderId,
  isAlertDialogOpen,
  setIsAlertDialogOpen,
  children,
}: BackToQueueWorkOrderDialogProps) {
  const { toast: addToast, ToastComponent } = useToast();
  const { handleBackToQueueWorkOrder, isBackToQueuePending } =
    useBackToQueueWorkOrder(addToast);

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTrigger>{children}</AlertDialogTrigger>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, ao voltar para fila você perderá todos os
            dados de manutenção (entrada em manutenção e box).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleBackToQueueWorkOrder(workOrderId)}
            disabled={isBackToQueuePending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isBackToQueuePending
              ? "Retornando para fila..."
              : "Voltar pra fila mesmo assim"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <ToastComponent />
    </AlertDialog>
  );
}
