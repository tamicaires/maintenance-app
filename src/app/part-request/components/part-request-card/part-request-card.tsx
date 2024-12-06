import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IPartRequest } from "@/shared/types/part-request";
import { RequestStatus } from "@/shared/enums/part-request";
import { getRequestStatusInfo } from "@/utils/part-request";
import { Profile } from "@/components/Profile";
import { InfoDisplay } from "@/components/info-display";
import { UpdatesTimeline, Update } from "@/components/UpdatesTimeLine";

type PartRequestCardProps = {
  partRequest: IPartRequest;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export function PartRequestCard({
  partRequest,
  isOpen,
  onClose,
  children,
}: PartRequestCardProps) {
  const statusInfo = getRequestStatusInfo(partRequest.status);

  const updates: Update[] = [
    {
      date: partRequest.requestedAt,
      message: "Registro de solicitação de peça",
      color: "yellow",
    },
    {
      date:
        partRequest.status === RequestStatus.APPROVED && partRequest.handledAt
          ? partRequest.handledAt
          : null,
      message: "Solicitação aprovada",
      color: "blue",
    },
    {
      date:
        partRequest.status === RequestStatus.REJECTED && partRequest.handledAt
          ? partRequest.handledAt
          : null,
      message: "Solicitação rejeitada",
      color: "red",
    },
    {
      date: partRequest.deliveredAt,
      message: "Peça entregue",
      color: "green",
    },
  ];

  const partRequestInfos = [
    {
      label: "Qtd. Solicitada",
      value: partRequest.quantity,
    },
    {
      label: "Quantidade Aprovada",
      value: partRequest.approvedQuantity || "-",
    },
    {
      label: "Ordem de Serviço",
      value: partRequest.workOrder?.displayId || "N/A",
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
                {partRequest.part?.name || "Peça não especificada"}
              </h2>
              <p className="text-[1rem] text-muted-foreground leading-none">
                Número da Peça: {partRequest.part?.partNumber || "N/A"}
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
                  Reboque {partRequest.trailer.position}
                </p>
                <p className="font-bold text-lg leading-none">
                  {partRequest.trailer.plate}
                </p>
              </div>
              <Profile
                companyName={partRequest.requestedBy?.name || "N/A"}
                description="Solicitante"
                showAvatar
                size="large"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Detalhes da Solicitação</h3>
              <div className="grid grid-cols-3 gap-4">
                {partRequestInfos.map((info, index) => (
                  <InfoDisplay
                    key={index}
                    label={info.label}
                    value={info.value}
                  />
                ))}
              </div>
            </div>

            <UpdatesTimeline updates={updates} />

            {partRequest.isRejected && (
              <div className="space-y-2">
                <h3 className="font-bold text-red-600">Motivo da Rejeição</h3>
                <p className="text-red-600">
                  {partRequest.rejectionReason || "Não especificado"}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              {partRequest.status !== RequestStatus.DELIVERED &&
                partRequest.status !== RequestStatus.REJECTED && (
                  <Button>
                    {partRequest.status === RequestStatus.PENDING
                      ? "Cancelar Solicitação"
                      : "Marcar como Entregue"}
                  </Button>
                )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
