import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, MoreVertical, Printer, Download, Share2 } from 'lucide-react'
import { IWorkOrder } from "@/shared/types/work-order.interface"
import { cn } from "@/lib/utils"

interface MobileWorkOrderHeaderProps {
  workOrder: IWorkOrder
  statusInfo: any
  progressAnimation: number
  setIsDialogOpen: (isOpen: boolean) => void
}

export function MobileWorkOrderHeader({
  workOrder,
  statusInfo,
  progressAnimation,
  setIsDialogOpen
}: MobileWorkOrderHeaderProps) {
  return (
    <div className="flex flex-col bg-background p-3 border-b">
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-base font-semibold">OS {workOrder.displayId}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir OS
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${workOrder.fleet.carrierName}`} />
          <AvatarFallback>TR</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{workOrder.fleet.carrierName}</p>
          <p className="text-xs text-muted-foreground">Frota: {workOrder.fleet.fleetNumber}</p>
        </div>
      </div>

      <div className="bg-card rounded-lg p-2 border mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full bg-${statusInfo.color}-100`}>
              <statusInfo.icon className={`h-3 w-3 text-${statusInfo.color}-500`} />
            </div>
            <p className="text-sm font-medium">{statusInfo.label}</p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-2 py-0.5",
              statusInfo.color === "yellow" && "bg-yellow-100 text-yellow-800",
              statusInfo.color === "blue" && "bg-blue-100 text-blue-800",
              statusInfo.color === "orange" && "bg-orange-100 text-orange-800",
              statusInfo.color === "green" && "bg-green-100 text-green-800"
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>
        <Progress value={progressAnimation} className="h-1" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <Card className="p-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Tempo Total</span>
            <span className="text-sm font-semibold">{workOrder.maintenanceDuration || 0} min</span>
          </div>
        </Card>
        <Card className="p-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Serviços</span>
            <span className="text-sm font-semibold">{70 || 0}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}