import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown, Clock } from "lucide-react";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment";
import { getServiceAssigmentStatusInfo } from "@/utils/service-assigment";
import { dateUtil } from "@/utils/date";
import { ServiceActionDialog } from "@/features/service-assigment/components/service-assingment-action/service-action-dialog";
import EmployeeAvatarGroup from "@/components/AvatarGroup";

type ServiceOrderCardProps = {
  serviceAssignment: IServiceAssignment;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export function ServiceOrderCard({
  serviceAssignment,
  isOpen,
  onClose,
  children,
}: ServiceOrderCardProps) {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  const statusInfo = getServiceAssigmentStatusInfo(serviceAssignment.status);

  const getUpdateIcon = (date: Date | null) => {
    if (!date) return <ArrowUpDown className={`h-4 w-4 `} />;
    return date <= new Date() ? (
      <ArrowUpDown className={`h-4 w-4`} />
    ) : (
      <ArrowUpDown className={`h-4 w-4`} />
    );
  };

  const updates = [
    {
      date: serviceAssignment.createdAt,
      message: "Serviço registrado para ordem de serviço",
      color: "yellow",
    },
    {
      date: serviceAssignment.startAt,
      message: "Início do serviço",
      color: "blue",
    },
    {
      date: serviceAssignment.endAt,
      message: "Finalização do serviço",
      color: "green",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card">
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-zinc-100">
            <div className="space-y-1">
              <h2 className="text-[1.6rem] font-bold leading-none">
                {serviceAssignment.service.serviceName}
              </h2>
              <p className="text-[1rem] text-muted-foreground leading-none">
                Categoria: {serviceAssignment.service.serviceCategory}
              </p>
            </div>
            <div
              className={`rounded-full bg-${statusInfo.color}-500 bg-opacity-10 px-3 py-1 text-sm text-${statusInfo.color}-600`}
            >
              {statusInfo.label}
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1 leading-none">
                <p className="text-sm text-muted-foreground leading-none">
                  Reboque SR{serviceAssignment.trailer.position}
                </p>
                <p className="font-bold text-lg leading-none">
                  {serviceAssignment.trailer.plate}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-muted-foreground mb-1">
                  Responsáveis
                </p>
                <div className="flex -space-x-2">
                  <EmployeeAvatarGroup
                    serviceAssignmentId={serviceAssignment.id}
                    employees={serviceAssignment.employees}
                    onAddEmployee={() => console.log("added o employee")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Últimas atualizações</h3>
              <div className="space-y-4">
                {updates.map((update, index) => (
                  <div>
                    {update.date && (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`mt-1 bg-${update.color}-500 bg-opacity-15 p-1.5 rounded-full text-${update.color}-500`}
                        >
                          {getUpdateIcon(update.date)}
                        </div>
                        <div className="flex gap-2 w-full items-center justify-between space-y-1">
                          <p className="text-md font-semibold leading-none">
                            {update.message}
                          </p>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {update.date
                              ? dateUtil.timeSince(new Date(update.date))
                              : "Não definido"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <ServiceActionDialog
              isOpen={isActionDialogOpen}
              onClose={() => setIsActionDialogOpen(false)}
              serviceAssignmentId={serviceAssignment.id}
              action={
                serviceAssignment.status === ServiceAssigmentStatus.PENDING
                  ? "start"
                  : "finish"
              }
            >
              <div className="flex justify-end">
                {serviceAssignment.status !==
                  ServiceAssigmentStatus.COMPLETED && (
                  <Button onClick={() => setIsActionDialogOpen(true)}>
                    {serviceAssignment.status === ServiceAssigmentStatus.PENDING
                      ? "Iniciar Serviço"
                      : "Finalizar Serviço"}
                  </Button>
                )}
              </div>
            </ServiceActionDialog>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
