import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ITrailer } from "@/shared/types/trailer.interface";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { TrailerWidgetDetails } from "../trailer-details/trailer-details-dialog";

type TrailerDropdownProps = {
  trailer: ITrailer;
  onDelete: (trailerId: string) => void;
};

export function TrailerDropDown({ trailer, onDelete }: TrailerDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <TrailerWidgetDetails
          trailer={trailer}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalhes
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={() => onDelete(trailer.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
