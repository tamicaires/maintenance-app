import { IServiceAssignment } from "@/shared/types/service-assigment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  CircleCheckBig,
  CircleX,
  Eye,
  MoreHorizontal,
  Play,
} from "lucide-react";
import { TableCell, TableRow } from "../../../../components/ui/table";
import EmployeeAvatarGroup from "../../../../components/AvatarGroup";
import { Badge } from "../../../../components/ui/badge";
import { getServiceAssigmentStatusInfo } from "@/utils/service-assigment";

import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment";
import { ServiceOrderCard } from "@/features/service-assigment/components/service-assigment-card/service-assigment-card";
import { ServiceActionDialog } from "../service-assingment-action/service-action-dialog";
import { useState } from "react";

interface IServiceAssigmentItem {
  serviceAssigment: IServiceAssignment;
}

export default function ServiceAssigmentItem({
  serviceAssigment,
}: IServiceAssigmentItem) {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState<boolean>(false);
  const statusInfo = getServiceAssigmentStatusInfo(serviceAssigment.status);

  const isStatusClosed =
    serviceAssigment.status === ServiceAssigmentStatus.COMPLETED ||
    serviceAssigment.status === ServiceAssigmentStatus.CANCELED;

  return (
    <TableRow key={serviceAssigment.id}>
      <TableCell>
        <div className="leading-none">
          <h3 className="font-medium">
            {serviceAssigment.service.serviceName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {serviceAssigment.service.serviceCategory}
          </p>
        </div>
      </TableCell>{" "}
      <TableCell>
        <div>
          <Badge className="bg-blue-500 bg-opacity-20 text-blue-500 hover:bg-blue-700 hover:bg-opacity-20 rounded-sm">
            {`SR${serviceAssigment.trailer.position}`}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <EmployeeAvatarGroup
          serviceAssignmentId={serviceAssigment.id}
          employees={serviceAssigment.employees}
          onAddEmployee={() => console.log("added o employee")}
        />
      </TableCell>
      <TableCell>
        <Badge
          className={`text-${statusInfo.color}-600 bg-${statusInfo.color}-500 bg-opacity-10 hover:bg-${statusInfo.color}-700 hover:bg-opacity-20 text-xs`}
        >
          {statusInfo.label}
        </Badge>
      </TableCell>{" "}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!isStatusClosed && (
              <DropdownMenuItem
                className="hover:text-primary"
                onSelect={() => setIsActionDialogOpen(true)}
              >
                {serviceAssigment.status === ServiceAssigmentStatus.PENDING ? (
                  <div className="flex gap-1.5 items-center hover:text-primary">
                    <Play className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>Iniciar Serviço</span>
                  </div>
                ) : (
                  <div className="flex gap-1.5 items-center hover:text-primary">
                    <CircleCheckBig className="h-4 w-4 text-muted-foreground" />{" "}
                    <span>Finalizar Serviço</span>
                  </div>
                )}
              </DropdownMenuItem>
            )}
            <ServiceOrderCard serviceAssignment={serviceAssigment}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <div className="flex gap-1.5 items-center hover:text-primary">
                  <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  Ver detalhes
                </div>
              </DropdownMenuItem>
            </ServiceOrderCard>
            {!isStatusClosed && (
              <DropdownMenuItem className="text-red-600">
                <div className="flex gap-1.5 items-center">
                  <CircleX className="h-4 w-4 text-red-600" />
                  Cancelar Serviço
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>{" "}
      <ServiceActionDialog
        serviceAssignmentId={serviceAssigment.id}
        action={
          serviceAssigment.status === ServiceAssigmentStatus.PENDING
            ? "start"
            : "finish"
        }
        isOpen={isActionDialogOpen}
        onClose={() => setIsActionDialogOpen(false)}
      />
    </TableRow>
  );
}
