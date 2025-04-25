import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/core/providers/dialog";

type QuickActionsProps = {
  lastUpdate?: string;
  isFromWorkOrder?: boolean;
};

export function ChecklistQuickActions({
  lastUpdate,
  isFromWorkOrder,
}: QuickActionsProps) {
  const { closeDialog,  } = useDialog();
  if (isFromWorkOrder) {
    // TODO: Implementar lógica para voltar para a ordem de serviço ao finalizar checklist
  }
  return (
    <div className="fixed bottom-0 right-[0.112rem] w-full border-t bg-background/80 backdrop-blur-sm p-4 rounded-b-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <p className="font-medium">Última atualização</p>
              <p className="text-muted-foreground">
                {lastUpdate && format(new Date(lastUpdate), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => closeDialog()}>
            Fechar
          </Button>

          <Button>Finalizar Checklist</Button>
        </div>
      </div>
    </div>
  );
}
