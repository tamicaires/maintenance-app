import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";

export function OrderDetailsHeader () {
  return (
    <div className="p-6 bg-card rounded-lg border">
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold tracking-tight">
            Ordem de Serviço
          </div>
          <Badge
            variant="outline"
            className="text-green-500 border-green-600 bg-green-400 bg-opacity-10"
          >
            MP0001
          </Badge>
        </div>
        <div className="flex flex-col text-sm text-muted-foreground">
          <span>
            Criada por <strong>Bruno Silva</strong>{" "}
          </span>
          <span>
            Liberada por <strong>João Silva</strong>
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="default">
          <FileIcon className="w-4 h-4 mr-2" />
          Exportar em PDF
        </Button>
      </div>
    </div>
  </div>
  )
}