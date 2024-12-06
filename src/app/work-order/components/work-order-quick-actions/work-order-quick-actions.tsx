import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IWorkOrder } from "@/shared/types/work-order.interface";

type WorkOrderQuickActionsProps = {
  workOrder: IWorkOrder;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export function WorkOrderQuickActions({
  workOrder,
  setIsDialogOpen,
}: WorkOrderQuickActionsProps) {
  return (
    <div className="fixed bottom-0 w-full border-t bg-background/80 backdrop-blur-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${workOrder.createdAt}`}
              />
              <AvatarFallback>
                {workOrder.createdAt?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Última atualização</p>
              <p className="text-muted-foreground">
                {format(new Date(workOrder.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Fechar
          </Button>
          <Button>Atualizar Status</Button>
        </div>
      </div>
    </div>
  );
}
