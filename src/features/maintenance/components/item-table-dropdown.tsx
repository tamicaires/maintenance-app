import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Eye, MoreHorizontal } from "lucide-react";
import { WorkOrderDetails } from "@/features/work-order/components/work-order-details";

type DropDownItemTableProps = {
  workOrderId: string;
};

export function DropDownItemTable({ workOrderId }: DropDownItemTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu de manutenção</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <WorkOrderDetails
          workOrderId={workOrderId}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
              Detalhes Ordem de Serviço
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={() => {}}>
          <FaArrowRotateLeft className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
          Reabrir Ordem de Serviço
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
