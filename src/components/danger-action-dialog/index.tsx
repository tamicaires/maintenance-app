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
import { Loader2 } from "lucide-react";

interface DangerActionDialogProps {
  /**
   * Controla se o diálogo está aberto
   */
  open: boolean;

  /**
   * Função chamada quando o estado de abertura muda
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Título do diálogo
   * @default "Você tem certeza?"
   */
  title?: string;

  /**
   * Descrição do diálogo
   * @default "Esta ação é irreversível e não pode ser desfeita."
   */
  description?: string;

  /**
   * Texto do botão de cancelar
   * @default "Voltar"
   */
  cancelText?: string;

  /**
   * Texto do botão de confirmar
   * @default "Confirmar"
   */
  confirmText?: string;

  /**
   * Texto do botão de confirmar quando está em loading
   * @default "Processando..."
   */
  loadingText?: string;

  /**
   * Função chamada quando a ação é confirmada
   */
  onConfirm: () => void;

  /**
   * Indica se a ação está em andamento
   * @default false
   */
  isLoading?: boolean;
}

export function DangerActionDialog({
  open,
  onOpenChange,
  title = "Você tem certeza?",
  description = "Esta ação é irreversível e não pode ser desfeita.",
  cancelText = "Voltar",
  confirmText = "Confirmar",
  loadingText = "Processando...",
  onConfirm,
  isLoading = false,
}: DangerActionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
